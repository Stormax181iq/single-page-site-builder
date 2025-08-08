const db = require("../config/db");
const Controller = require("./controller");

class SitesController extends Controller {
  constructor() {
    super();
  }

  saveUserSite = async (req, res) => {
    try {
      const { templateId, form } = req.body;

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
          "SELECT id, template_id, created_at, values FROM user_sites WHERE user_id = $1 ORDER BY created_at DESC",
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

  sendMainSiteFile = async (req, res) => {
    try {
      const { id } = req.params;

      let dbResponse;

      // Secure database operation
      try {
        dbResponse = await db.query(
          "SELECT user_id, template_id, values FROM user_sites WHERE id = $1",
          [id]
        );
      } catch (error) {
        this.handleDatabaseError(error);
      }

      if (!dbResponse.rowCount > 0) {
        return res
          .status(404)
          .json({ error: "The id of this site was not found" });
      }

      const site = dbResponse.rows[0];

      if (site.user_id != req.user.id) {
        return res.status(403).json({
          error: "You can’t see this site because you are not the owner",
        });
      }

      await this.checkTemplateId(site.template_id);

      const preview = await this.generatePreview(site.template_id, site.values);

      return res.status(200).send(preview);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  sendSiteFile = async (req, res) => {
    try {
      const { id } = req.params;
      this.checkIdNumeric(id);
      let dbResponse;
      try {
        dbResponse = await db.query(
          "SELECT template_id FROM user_sites WHERE id = $1",
          [id]
        );
      } catch (error) {
        this.handleDatabaseError(error);
      }

      if (dbResponse.rowCount < 1) {
        return res.status(404).json({ error: "Can’t find this site’s id" });
      }

      const templateId = dbResponse.rows[0].template_id;

      await this.checkTemplateId(templateId);

      req.params.templateId = templateId;

      console.log("params: ", req.params);

      return await this.sendTemplateFile(req, res);
    } catch (error) {
      return this.handleError(error, res);
    }
  };
}

module.exports = new SitesController();
