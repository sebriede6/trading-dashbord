import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import winston from "winston";
import { Pool } from "pg";
import authRoutes from "./routes/auth.js";
import githubAuthRoutes from "./routes/github.js";
import todoRoutes from "./routes/todo.js";
import tradeRoutes from "./routes/trade.js";
import startkapitalRoutes from "./routes/startkapital.js";
import goalsRoutes from "./routes/goals.js";
import profileRoutes from "./routes/profile.js";

export function resolveProcessEnv(proc) {
  const source = typeof proc === "undefined" ? globalThis.process : proc;
  if (!source || !source.env) {
    return {};
  }
  return source.env;
}

const env = resolveProcessEnv();

export function resolvePort(portEnv = env) {
  return portEnv?.PORT ? Number(portEnv.PORT) || portEnv.PORT : 3000;
}

const defaultPort = resolvePort();

export function createLogger(options = {}) {
  const transports = options.transports || [
    new winston.transports.Console({ silent: options.silent }),
  ];
  return winston.createLogger({
    level: options.level || "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        return `${timestamp} [${level}]: ${message} ${
          Object.keys(meta).length ? JSON.stringify(meta) : ""
        }`;
      }),
    ),
    transports,
  });
}

export function createPool(connectionString = env.DATABASE_URL) {
  return new Pool({ connectionString });
}

export function createApp(pool, logger) {
  const app = express();

  app.use((req, res, next) => {
    logger?.info?.(`${req.method} ${req.url}`);
    next();
  });

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRoutes(pool, logger));
  app.use("/api/auth", githubAuthRoutes);
  app.use("/api/todos", todoRoutes(pool, logger));
  app.use("/api/trades", tradeRoutes(pool, logger));
  app.use("/api/startkapital", startkapitalRoutes(pool, logger));
  app.use("/api/goals", goalsRoutes(pool, logger));
  app.use("/api/profile", profileRoutes(pool, logger));

  app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

  app.use((err, req, res, next) => {
    void next;
    logger?.error?.(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}

const logger = createLogger();
const pool = createPool();
const app = createApp(pool, logger);

if (env.NODE_ENV !== "test") {
  app.listen(defaultPort, () =>
    logger.info(
      `Server running on port ${defaultPort} (${new Date().toLocaleString()})`,
    ),
  );
}

export { app, pool, logger };
export default app;
