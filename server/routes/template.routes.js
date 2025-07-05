const router = require("express").Router();
const templateController = require("../controllers/template.controller");
const auth = require("../middlewares/auth");

router.get("/", templateController.sendTemplatesOverview);

router.get(
  "/placeholders/:templateId",
  auth,
  templateController.sendTemplatePlaceholders
);

router.get(
  "/files/:templateId{/*fileName}",
  auth,
  templateController.sendTemplateFile
);
router.get("/thumbnails/:templateId", templateController.sendTemplateThumbnail);

module.exports = router;
