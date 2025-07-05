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

  savePreview = async (req, res) => {
    try {
      const { templateId } = req.params;
      const form = req.body;

      await this.checkTemplateId(templateId);
      console.log("went this far");

      // TODO : Save the preview as well
      try {
        await db.query(
          "INSERT INTO user_sites (user_id, template_id, values) VALUES ($1, $2, $3)",
          [req.user.id, templateId, form]
        );
      } catch (error) {
        this.handleDatabaseError(error);
      }
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

  async checkTemplateId(templateId) {
    if (!templateId) {
      throw { message: "templateId field cannot be empty", status: 400 };
    }
    const availableNames = await this.getTemplates();

    if (!availableNames.includes(templateId)) {
      throw { message: "Template Id does not exist", status: 404 };
    }
  }

  getTemplates = async () => {
    try {
      const response = await db.query("SELECT name FROM templates");
      const templateNames = [];
      response.rows.forEach((row) => {
        templateNames.push(row.name);
      });
      return templateNames;
    } catch (error) {
      this.handleDatabaseError(error, "Template");
    }
  };
}

module.exports = new TemplateController();
