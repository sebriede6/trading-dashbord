import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const credentialsSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z0-9_.-]+$/),
  password: z.string().min(8).max(128),
  email: z.string().trim().max(255).optional().or(z.literal("")),
});

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (process.env.NODE_ENV === "test" || process.env.VITEST)
    return secret || "test-secret";
  if (
    !secret ||
    secret.length < 32 ||
    secret === "local-jwt-secret-change-me"
  ) {
    throw new Error("JWT_SECRET is missing or too weak");
  }
  return secret;
}

export async function register(req, res, pool, logger) {
  if (!req.body?.username || !req.body?.password) {
    return res
      .status(400)
      .json({ error: "Benutzername und Passwort sind erforderlich" });
  }
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .json({ error: "Passwort muss mindestens 8 Zeichen haben" });
  }
  const parsed = credentialsSchema.safeParse(req.body || {});
  if (!parsed.success)
    return res.status(400).json({ error: "Ungültige Registrierungsdaten" });
  const { username, password, email } = parsed.data;
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
      [username, hash, email || null],
    );
    logger?.info?.("User registered", { username });
    res.status(201).json({ message: "Registrierung erfolgreich" });
  } catch (err) {
    if (err.code === "23505") {
      logger && logger.warn("Registration failed: duplicate", { username });
      return res
        .status(409)
        .json({ error: "Benutzername ist bereits vergeben" });
    }
    logger.error("Registration failed", { error: err, username });
    res.status(500).json({ error: "Registrierung fehlgeschlagen" });
  }
}

export async function login(req, res, pool, logger) {
  const { username, email, password } = req.body || {};
  const loginId = email || username;
  if (
    typeof loginId !== "string" ||
    !loginId.trim() ||
    typeof password !== "string" ||
    !password ||
    password.length > 128
  )
    return res.status(400).json({ error: "Login-Daten unvollständig" });
  try {
    logger?.info?.("Login attempt", { loginId });
    // Suche User anhand von Email oder Username
    const userRes = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [loginId],
    );
    const user = userRes.rows[0];
    if (!user) {
      logger && logger.warn("Login failed: user not found", { loginId });
      return res.status(401).json({ error: "User not found" });
    }
    // OAuth-User akzeptieren
    if (user.password === "github_oauth") {
      logger && logger.info("OAuth-Login akzeptiert", { loginId });
      // JWT generieren
      const token = jwt.sign(
        { username: user.username, email: user.email, userId: user.id },
        getJwtSecret(),
        { expiresIn: "1h" },
      );
      return res.json({
        user: { username: user.username, email: user.email, id: user.id },
        token,
      });
    }
    // Klassischer Passwort-Check
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logger && logger.warn("Login failed: invalid password", { loginId });
      return res.status(401).json({ error: "Invalid password" });
    }
    logger && logger.info("Login erfolgreich", { loginId });
    const token = jwt.sign(
      { username: user.username, email: user.email, userId: user.id },
      getJwtSecret(),
      { expiresIn: "1h" },
    );
    res.json({
      user: { username: user.username, email: user.email, id: user.id },
      token,
    });
  } catch (err) {
    logger.error("Login failed", { error: err, loginId });
    res.status(500).json({ error: "Login failed" });
  }
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ error: "No token" });
  jwt.verify(token, getJwtSecret(), (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

export async function changePassword(req, res, pool, logger) {
  const userId = req.user?.userId;
  const { currentPassword, newPassword } = req.body || {};
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (!currentPassword || !newPassword)
    return res.status(400).json({ error: "Missing fields" });
  if (newPassword.length < 8)
    return res.status(400).json({ error: "Password too short" });

  try {
    const userRes = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId],
    );
    const user = userRes.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.password === "github_oauth")
      return res
        .status(400)
        .json({ error: "Passwortänderung nicht für OAuth-Nutzer verfügbar" });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid)
      return res
        .status(401)
        .json({ error: "Aktuelles Passwort ist nicht korrekt" });

    const samePassword = await bcrypt.compare(newPassword, user.password);
    if (samePassword)
      return res
        .status(400)
        .json({ error: "Neues Passwort muss sich unterscheiden" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashed,
      userId,
    ]);
    logger && logger.info("Password updated", { userId });
    return res.json({ message: "Passwort aktualisiert" });
  } catch (error) {
    logger && logger.error("Password update failed", { error, userId });
    return res.status(500).json({ error: "Passwortänderung fehlgeschlagen" });
  }
}
