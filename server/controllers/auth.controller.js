class AuthController {
  async register(req, res) {
    try {
      const { username, password, passwordConfirm } = req.body;

      if (password !== passwordConfirm) {
        return res.status(400).json({ error: "Passwords don’t match" });
      }
      if (password.trim().length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new AuthController();
