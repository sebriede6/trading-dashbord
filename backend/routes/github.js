import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4173";

// Step 1: Redirect to GitHub
router.get("/github", (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`;
  res.redirect(redirectUrl);
});

// Step 2: GitHub callback
router.get("/github/callback", async (req, res) => {
  const code = req.query.code;
  console.log("[GitHub-OAuth] Callback aufgerufen, code=", code);
  if (!code) return res.status(400).send("Code fehlt");
  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } },
    );
    const accessToken = tokenRes.data.access_token;
    console.log("[GitHub-OAuth] AccessToken erhalten:", accessToken);
    // Get user info
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });
    const githubUser = userRes.data;
    console.log("[GitHub-OAuth] GitHub-User: ", githubUser);
    // Optional: Get email
    let email = githubUser.email;
    if (!email) {
      const emailsRes = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `token ${accessToken}` },
      });
      email =
        emailsRes.data.find((e) => e.primary)?.email ||
        emailsRes.data[0]?.email;
      console.log("[GitHub-OAuth] Email aus /emails: ", email);
    }
    // User in DB anlegen, falls nicht vorhanden
    let user = null;
    try {
      // Suche User anhand von Username ODER Email
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1 OR email = $2",
        [githubUser.login, email],
      );
      if (result.rows.length === 0) {
        // Default-Startkapital (z.B. 10000)
        const defaultStartkapital = 10000;
        const insertRes = await pool.query(
          "INSERT INTO users (username, email, password, startkapital) VALUES ($1, $2, $3, $4) RETURNING *",
          [githubUser.login, email, "github_oauth", defaultStartkapital],
        );
        user = insertRes.rows[0];
        console.log("[GitHub-OAuth] User neu angelegt:", user);
      } else {
        user = result.rows[0];
        console.log("[GitHub-OAuth] User existiert:", user);
      }
    } catch (dbErr) {
      console.error("[GitHub-OAuth] DB-Fehler bei User-Anlage:", dbErr);
      return res.status(500).send("DB-Fehler bei User-Anlage");
    }
    // JWT erstellen
    const token = jwt.sign(
      { username: githubUser.login, email, userId: user.id },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    console.log("[GitHub-OAuth] JWT erstellt:", token);
    // Direktes Redirect auf das Frontend mit Token (ohne HTML/JS)
    res.redirect(`${FRONTEND_URL}/github-success?token=${token}`);
  } catch (err) {
    console.error("[GitHub-OAuth] Fehler im Callback:", err);
    res.status(500).send("GitHub Login fehlgeschlagen");
  }
});

export default router;
