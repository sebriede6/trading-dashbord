import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

export function createGitHubRouter({
  pool = new Pool({ connectionString: process.env.DATABASE_URL }),
  axiosClient = axios,
  jwtSecret = process.env.JWT_SECRET,
  clientId = process.env.GITHUB_CLIENT_ID,
  clientSecret = process.env.GITHUB_CLIENT_SECRET,
  frontendUrl = process.env.FRONTEND_URL || "http://localhost:4173",
  logger = console,
} = {}) {
  const router = express.Router();

  router.get("/github", (req, res) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
    res.redirect(redirectUrl);
  });

  router.get("/github/callback", async (req, res) => {
    const code = req.query.code;
    logger.info?.("[GitHub-OAuth] Callback aufgerufen");
    if (!code) return res.status(400).send("Code fehlt");
    try {
      const tokenRes = await axiosClient.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        { headers: { Accept: "application/json" } },
      );
      const accessToken = tokenRes.data.access_token;

      const userRes = await axiosClient.get("https://api.github.com/user", {
        headers: { Authorization: `token ${accessToken}` },
      });
      const githubUser = userRes.data;
      logger.info?.("[GitHub-OAuth] GitHub-User erhalten", {
        id: githubUser.id,
        login: githubUser.login,
      });

      let email = githubUser.email;
      if (!email) {
        const emailsRes = await axiosClient.get(
          "https://api.github.com/user/emails",
          {
            headers: { Authorization: `token ${accessToken}` },
          },
        );
        email =
          emailsRes.data.find((e) => e.primary)?.email ||
          emailsRes.data[0]?.email ||
          null;
        logger.info?.("[GitHub-OAuth] Email aus /emails", {
          hasEmail: Boolean(email),
        });
      }

      let user = null;
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE username = $1 OR email = $2",
          [githubUser.login, email],
        );
        if (result.rows.length === 0) {
          const defaultStartkapital = 10000;
          const insertRes = await pool.query(
            "INSERT INTO users (username, email, password, startkapital) VALUES ($1, $2, $3, $4) RETURNING *",
            [githubUser.login, email, "github_oauth", defaultStartkapital],
          );
          user = insertRes.rows[0];
          logger.info?.("[GitHub-OAuth] User neu angelegt", {
            id: user.id,
            username: user.username,
          });
        } else {
          user = result.rows[0];
          logger.info?.("[GitHub-OAuth] User existiert", {
            id: user.id,
            username: user.username,
          });
        }
      } catch (dbErr) {
        logger.error?.("[GitHub-OAuth] DB-Fehler bei User-Anlage", dbErr);
        return res.status(500).send("DB-Fehler bei User-Anlage");
      }

      const token = jwt.sign(
        { username: githubUser.login, email, userId: user.id },
        jwtSecret,
        { expiresIn: "1d" },
      );
      logger.info?.("[GitHub-OAuth] JWT erstellt", { userId: user.id });
      res.redirect(`${frontendUrl}/github-success?token=${token}`);
    } catch (err) {
      logger.error?.("[GitHub-OAuth] Fehler im Callback", err);
      res.status(500).send("GitHub Login fehlgeschlagen");
    }
  });

  return router;
}

const defaultRouter = createGitHubRouter();
export default defaultRouter;
