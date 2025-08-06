const db = require("../config/db");
const Controller = require("./controller");

class SitesController extends Controller {
  constructor() {
    super();
  }

  saveUserSite = async (req, res) => {
    try {
      const { templateId, form } = req.body;

      console.log(req.body);

      await this.checkTemplateId(templateId);

      try {
        await db.query(
          "INSERT INTO user_sites (user_id, template_id, values) VALUES ($1, $2, $3)",
          [req.user.id, templateId, form]
        );
      } catch (error) {
        this.handleDatabaseError(error);
      }

      return res.status(201).send();
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getUserSites = async (req, res) => {
    try {
      let dbResponse;
      try {
        dbResponse = await db.query(
          "SELECT template_id, created_at, values FROM user_sites WHERE user_id = $1 ORDER BY created_at DESC",
          [req.user.id]
        );
      } catch (error) {
        this.handleDatabaseError(error);
      }

      let sites = dbResponse.rowCount > 0 ? dbResponse.rows : null;
      return res.status(200).json(sites);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}

module.exports = new SitesController();
