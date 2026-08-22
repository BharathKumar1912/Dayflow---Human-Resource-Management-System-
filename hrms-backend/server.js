const express = require("express");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/attendance", require("./routes/attendance"));
app.use("/leave", require("./routes/leave"));
app.use("/dashboard", dashboardRoutes);
app.use("/workspace", require("./routes/workspace"));
app.listen(5000, () => console.log("Server running on port 5000"));