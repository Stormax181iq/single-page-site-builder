const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/users", authController.register);

router.post("/sessions", authController.login);
router.delete("/sessions", authController.logout);

module.exports = router;
