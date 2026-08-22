const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Employee view payroll
router.get("/:userId", (req, res) => {
  db.query("SELECT * FROM payroll WHERE userId=?", [req.params.userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Admin view all payroll
router.get("/", (req, res) => {
  db.query("SELECT * FROM payroll", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Admin update salary
router.put("/update/:userId", (req, res) => {
  const { salary } = req.body;
  db.query("UPDATE payroll SET salary=? WHERE userId=?", [salary, req.params.userId], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Salary updated!");
  });
});

module.exports = router;
