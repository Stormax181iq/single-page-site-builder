const db = require("../config/db");

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
}

module.exports = Controller;
