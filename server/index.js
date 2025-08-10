const express = require("express");
const app = express();
const db = require("./config/db");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const templateRoutes = require("./routes/template.routes");
const siteRoutes = require("./routes/sites.routes");
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

app.get("/test", (req, res) => {
	res.send("test succeeded");
});

app.use("/api/auth", authRoutes);

app.use("/api/templates", templateRoutes);

app.use("/api/sites", siteRoutes);
