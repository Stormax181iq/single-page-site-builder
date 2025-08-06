const router = require("express").Router();
const sitesController = require("../controllers/sites.controller.js");
const auth = require("../middlewares/auth");

router.get("/", auth, sitesController.getUserSites);

router.post("/", auth, sitesController.saveUserSite);

module.exports = router;
