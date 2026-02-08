import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function register(req, res, pool, logger) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hash,
    ]);
    logger.info(`User registered: ${username}`);
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    logger.error("Registration failed", { error: err, username });
    res.status(500).json({ error: "Registration failed" });
  }
}

export async function login(req, res, pool, logger) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const { username, email, password } = req.body;
    logger.info(`Login-Request Body:`, req.body);
    // Wenn email nicht gesetzt, nutze username als email
    const loginId = email || username;
    if (!loginId || !password)
      return res.status(400).json({ error: "Missing fields" });
    logger.info(`Login attempt for user: ${loginId}`);
    // Suche User anhand von Email oder Username
    const userRes = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [loginId],
    );
    const user = userRes.rows[0];
    if (!user) {
      logger && logger.warn("Login failed: user not found", { username });
      return res.status(401).json({ error: "User not found" });
    }
    // OAuth-User akzeptieren
    if (user.password === "github_oauth") {
      logger && logger.info("OAuth-Login akzeptiert", { username });
      // JWT generieren
      const token = jwt.sign(
        { username: user.username, email: user.email, userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
      );
      return res.json({
        user: { username: user.username, email: user.email, id: user.id },
        token,
      });
    }
    // Klassischer Passwort-Check
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logger && logger.warn("Login failed: invalid password", { username });
      return res.status(401).json({ error: "Invalid password" });
    }
    logger && logger.info("Login erfolgreich", { username });
    const token = jwt.sign(
      { username: user.username, email: user.email, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.json({
      user: { username: user.username, email: user.email, id: user.id },
      token,
    });
  } catch (err) {
    logger.error("Login failed", { error: err, username });
    res.status(500).json({ error: "Login failed" });
  }
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}
