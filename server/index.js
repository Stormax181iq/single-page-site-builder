const express = require("express");
const app = express();
const db = require("./config/db");

const PORT = 5000;

app.get("/", async (req, res) => {
  const response = await db.query("SELECT * FROM test");
  res.send(response);
});

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});
