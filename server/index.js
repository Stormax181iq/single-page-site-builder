const express = require("express");
const app = express();
const db = require("./config/db");

const PORT = 5000;

app.get("/", async (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});
