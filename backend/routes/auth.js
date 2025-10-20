const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await Auth.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Usuario o email ya existe" });
    }

    const user = new Auth({ username, password, email });
    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      username: user.username
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, username: decoded.username });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Token inválido" });
  }
});

module.exports = router;