const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Express routes
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/attendance", require("./routes/attendance"));
app.use("/leave", require("./routes/leave"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/workspace", require("./routes/workspace"));
app.use("/payroll", require("./routes/payroll"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));