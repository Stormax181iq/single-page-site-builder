const router = require("express").Router();
const sitesController = require("../controllers/sites.controller.js");
const auth = require("../middlewares/auth");

router.get("/", auth, sitesController.getUserSites);

router.post("/", auth, sitesController.saveUserSite);

router.get("/:id", auth, sitesController.sendMainSiteFile);
router.get("/:id{/*fileName}", auth, sitesController.sendSiteFile);
router.delete("/:id", auth, sitesController.deleteSite);

module.exports = router;
