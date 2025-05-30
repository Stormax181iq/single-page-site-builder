const express = require("express");
const app = express();
const db = require("./config/db");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const auth = require("./middlewares/auth");

const PORT = 5000;
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});

app.get("/", auth, (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);
