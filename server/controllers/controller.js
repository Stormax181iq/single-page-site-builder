const db = require("../config/db");
const path = require("path");
const fs = require("fs/promises");

class Controller {
  constructor() {}

  handleError(error, res) {
    console.error(error);

    const status = error.status || 500;
    const message = error.message;

    return res
      .status(status)
      .json({ error: status === 500 ? "Internal Server Error" : message });
  }

  handleDatabaseError(error, field = null) {
    const errorMessages = {
      23502: field + " cannot be null or empty",
      23514: field + " doesn't match the requirements",
      23505: field + " already exists",
    };

    console.error(error);
    const message = errorMessages[error.code] || "Internal Server Error";
    const status = errorMessages[error.code] ? 400 : 500;

    throw { status, message };
  }

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

  generatePreview = async (templateId, form) => {
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

  checkIdNumeric = (id) => {
    if (!Number.isInteger(Number(id))) {
      throw { message: "Id must be a number", status: 400 };
    }
  };
}

module.exports = Controller;
