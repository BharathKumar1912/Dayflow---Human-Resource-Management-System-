const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Employee Dashboard
router.get("/employee/:userId", (req, res) => {
  const userId = req.params.userId;

  const queries = {
    profile: "SELECT employeeId, email, role FROM users WHERE id=?",
    attendance: "SELECT * FROM attendance WHERE userId=? ORDER BY date DESC LIMIT 5",
    leaves: "SELECT * FROM leave_requests WHERE userId=? ORDER BY id DESC LIMIT 5",
    payroll: "SELECT * FROM payroll WHERE userId=?"
  };

  db.query(queries.profile, [userId], (err, profile) => {
    if (err) return res.status(500).send(err);

    db.query(queries.attendance, [userId], (err, attendance) => {
      if (err) return res.status(500).send(err);

      db.query(queries.leaves, [userId], (err, leaves) => {
        if (err) return res.status(500).send(err);

        db.query(queries.payroll, [userId], (err, payroll) => {
          if (err) return res.status(500).send(err);

          res.json({ profile: profile[0], attendance, leaves, payroll });
        });
      });
    });
  });
});

// Admin Dashboard
router.get("/admin", (req, res) => {
  const queries = {
    employees: "SELECT id, employeeId, email, role FROM users",
    attendance: "SELECT * FROM attendance ORDER BY date DESC LIMIT 10",
    leaves: "SELECT * FROM leave_requests ORDER BY id DESC LIMIT 10",
    payroll: "SELECT * FROM payroll"
  };

  db.query(queries.employees, (err, employees) => {
    if (err) return res.status(500).send(err);

    db.query(queries.attendance, (err, attendance) => {
      if (err) return res.status(500).send(err);

      db.query(queries.leaves, (err, leaves) => {
        if (err) return res.status(500).send(err);

        db.query(queries.payroll, (err, payroll) => {
          if (err) return res.status(500).send(err);

          res.json({ employees, attendance, leaves, payroll });
        });
      });
    });
  });
});

module.exports = router;