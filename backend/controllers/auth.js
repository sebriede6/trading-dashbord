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
    logger.info(`Login attempt for user: ${username}`);
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      logger.warn(`Login failed: user not found: ${username}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logger.warn(`Login failed: invalid password for user: ${username}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    logger.info(`Login success for user: ${username}`);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
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
