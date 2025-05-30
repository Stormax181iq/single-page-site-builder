const express = require("express");
const app = express();
const db = require("./config/db");
const cookieParser = require("cookie-parser");

const PORT = 5000;

const authRoutes = require("./routes/auth.routes");
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});

app.use("/api/auth", authRoutes);
