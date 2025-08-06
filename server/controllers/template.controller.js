const db = require("../config/db");
const path = require("path");
const fs = require("fs/promises");

const Controller = require("./controller");

class TemplateController extends Controller {
  constructor() {
    super();
  }

  sendTemplatesOverview = async (req, res) => {
    try {
      const templates = await this.getTemplates();
      templates.forEach((name, index, arr) => {
        arr[index] = {
          name: name,
          endpoint: "/templates/files/" + name + "/index.html",
          imgSrc: "/templates/thumbnails/" + name,
        };
      });
      res.status(200).json(templates);
    } catch (error) {
      return this.handleError(error, res);
    }
  };

  sendTemplatePlaceholders = async (req, res) => {
    try {
      const { templateId } = req.params;

      await this.checkTemplateId(templateId);

      const placeholdersPath = path.join(
        __dirname,
        "..",
        "templates",
        templateId,
        "js",
        "placeholders.json"
      );

      const rawFile = await fs.readFile(placeholdersPath, {
        encoding: "utf-8",
      });
      const data = await JSON.parse(rawFile);

      res.status(200).json(data);
    } catch (error) {
      this.handleError(error);
    }
  };

  sendTemporaryPreview = async (req, res) => {
    try {
      const { templateId } = req.params;
      const form = req.query;

      await this.checkTemplateId(templateId);

      const preview = await this.generatePreview(templateId, form);

      // Send the preview
      res.status(200).send(preview);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  generatePreview = async (templateId, form) => {
    try {
      const indexPath = path.join(
        __dirname,
        "..",
        "templates",
        templateId,
        "index.html"
      );

      let html = await fs.readFile(indexPath, { encoding: "utf-8" });
      Object.entries(form).forEach(([key, value]) => {
        html = html.replaceAll(`{{${key}}}`, value);
      });

      return html;
    } catch (error) {
      this.handleError(error, res);
    }
  };

  sendTemplateFile = async (req, res) => {
    try {
      const { templateId, fileName } = req.params;

      await this.checkTemplateId(templateId);

      const filePath = path.join(
        __dirname,
        "..",
        "templates",
        templateId,
        ...fileName
      );

      try {
        await fs.access(filePath);
      } catch (error) {
        console.error(error);
        throw { message: "file not found", status: 404 };
      }

      res.status(200).sendFile(filePath);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  sendTemplateThumbnail = async (req, res) => {
    try {
      const { templateId } = req.params;

      await this.checkTemplateId(templateId);

      const thumbnailPath = path.join(
        __dirname,
        "..",
        "templates",
        `${templateId}`,
        `${templateId}.jpg`
      );
      try {
        await fs.access(thumbnailPath);
      } catch (error) {
        throw { message: "thumbnail not found", status: 404 };
      }
      res.status(200).sendFile(thumbnailPath);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}

module.exports = new TemplateController();
