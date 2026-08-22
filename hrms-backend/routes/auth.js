const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign Up
router.post("/signup", (req, res) => {
  const { employeeId, email, password, role } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  db.query("INSERT INTO users (employeeId, email, password, role) VALUES (?,?,?,?)",
    [employeeId, email, hashed, role],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("User registered!");
    });
});

// Sign In
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {
    if (err || results.length === 0) return res.status(400).send("Invalid email");
    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user.id, role: user.role }, "secretkey");
    res.json({ token, role: user.role });
  });
});

module.exports = router;