import { newDb } from "pg-mem";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import request from "supertest";
import { createApp } from "../server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const modelsDir = path.join(__dirname, "..", "models");

const noopLogger = {
  info: () => {},
  warn: () => {},
  error: () => {},
};

export function loadMigrations(db, fileSystem = fs) {
  const files = fileSystem
    .readdirSync(modelsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => {
      if (a === "init.sql") return -1;
      if (b === "init.sql") return 1;
      return a.localeCompare(b);
    });
  for (const file of files) {
    const sql = fileSystem.readFileSync(path.join(modelsDir, file), "utf8");
    if (sql.trim().length) {
      db.public.none(sql);
    }
  }
}

export async function setupTestApp() {
  const db = newDb({ autoCreateForeignKeyIndices: true });
  loadMigrations(db);
  const { Pool } = db.adapters.createPg();
  const pool = new Pool();
  const app = createApp(pool, noopLogger);
  return { app, pool, db };
}

export async function registerUser(app, user) {
  return request(app).post("/api/auth/register").send(user);
}

export async function loginUser(app, credentials) {
  return request(app).post("/api/auth/login").send(credentials);
}
