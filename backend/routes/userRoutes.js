const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Audit = require("../models/auditSqlite");

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    await Audit.create({
      action: "Creación de usuario",
      userDni: req.body.email || req.body.username || "N/A",
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    await Audit.create({
      action: "Actualización de usuario",
      userDni: updatedUser?.email || "N/A",
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    await Audit.create({
      action: "Eliminación de usuario",
      userDni: deleted?.email || "N/A",
    });
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
