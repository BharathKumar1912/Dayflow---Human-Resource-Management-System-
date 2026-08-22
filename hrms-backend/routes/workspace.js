const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all workspaces
router.get("/", (req, res) => {
  db.query("SELECT * FROM workspaces", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create a new workspace
router.post("/add", (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: "Workspace name is required" });

  db.query(
    "INSERT INTO workspaces (name, description) VALUES (?, ?)",
    [name, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Workspace created successfully", workspaceId: result.insertId });
    }
  );
});

module.exports = router;