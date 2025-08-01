const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/auth.router"));

app.use("/api/skills", require("./routes/skills.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/swaps", require("./routes/swaps.routes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
