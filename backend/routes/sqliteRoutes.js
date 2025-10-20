const express = require("express");
const router = express.Router();
const Audit = require("../models/auditSqlite");

router.post("/", async (req, res) => {
  try {
    const audit = await Audit.create(req.body);
    res.status(201).json(audit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const logs = await Audit.findAll();
  res.json(logs);
});

module.exports = router;
