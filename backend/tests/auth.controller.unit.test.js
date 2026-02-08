import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  register,
  login,
  authenticate,
  changePassword,
} from "../controllers/auth.js";
import { createMockLogger, createMockRes } from "./controllerTestUtils.js";

process.env.JWT_SECRET = "unit-test-secret";

describe("Auth Controller zusätzliche Pfade", () => {
  let logger;

  beforeEach(() => {
    logger = createMockLogger();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fordert Benutzername und Passwort bei der Registrierung", async () => {
    const res = createMockRes();
    await register({ body: { username: "", password: "" } }, res, {}, logger);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Benutzername");
  });

  it("erzwingt Mindestlänge für Passwörter", async () => {
    const res = createMockRes();
    await register(
      { body: { username: "neo", password: "short" } },
      res,
      {},
      logger,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("8 Zeichen");
  });

  it("meldet Konflikte bei doppelten Nutzern", async () => {
    const duplicateError = new Error("duplicate");
    duplicateError.code = "23505";
    const pool = { query: vi.fn(async () => Promise.reject(duplicateError)) };
    const res = createMockRes();
    await register(
      { body: { username: "neo", password: "Matrix123", email: "neo@zion" } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(409);
    expect(logger.warn).toHaveBeenCalled();
  });

  it("gibt 400 zurück, wenn Login-Daten fehlen", async () => {
    const res = createMockRes();
    await login({ body: {} }, res, {}, logger);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Login-Daten");
  });

  it("liefert 401, wenn der Nutzer nicht existiert", async () => {
    const pool = { query: vi.fn(async () => ({ rows: [] })) };
    const res = createMockRes();
    await login(
      { body: { username: "ghost", password: "irrelevant" } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(401);
    expect(logger.warn).toHaveBeenCalledWith(
      "Login failed: user not found",
      expect.objectContaining({ loginId: "ghost" }),
    );
  });

  it("akzeptiert OAuth-Nutzer ohne Passwortprüfung", async () => {
    const pool = {
      query: vi.fn(async () => ({
        rows: [
          {
            id: 7,
            username: "octo",
            email: "octo@example.com",
            password: "github_oauth",
          },
        ],
      })),
    };
    const res = createMockRes();
    await login(
      { body: { username: "octo", password: "egal" } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.user.username).toBe("octo");
    expect(res.body.token).toBeTruthy();
  });

  it("weist falsche Passwörter zurück", async () => {
    const pool = {
      query: vi.fn(async () => ({
        rows: [
          {
            id: 5,
            username: "trinity",
            email: "t@zion",
            password: "hashed",
          },
        ],
      })),
    };
    vi.spyOn(bcrypt, "compare").mockResolvedValue(false);
    const res = createMockRes();
    await login(
      { body: { username: "trinity", password: "wrong" } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid password");
  });

  it("meldet interne Fehler beim Login", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const res = createMockRes();
    await login(
      { body: { username: "bug", password: "Passwort123" } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalledWith(
      "Login failed",
      expect.objectContaining({ loginId: "bug" }),
    );
  });

  it("verlangt einen Authorization-Header", () => {
    const res = createMockRes();
    authenticate({ headers: {} }, res, () => {});
    expect(res.statusCode).toBe(401);
  });

  it("validiert JWTs und lehnt ungültige Tokens ab", () => {
    const res = createMockRes();
    authenticate(
      { headers: { authorization: "Bearer invalid" } },
      res,
      () => {},
    );
    expect(res.statusCode).toBe(403);
  });

  it("akzeptiert gültige Tokens und setzt req.user", () => {
    const token = jwt.sign({ userId: 11 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const next = vi.fn();
    const req = { headers: { authorization: `Bearer ${token}` } };
    authenticate(req, createMockRes(), next);
    expect(next).toHaveBeenCalled();
    expect(req.user.userId).toBe(11);
  });

  it("blockiert Passwortwechsel ohne Nutzerkontext", async () => {
    const res = createMockRes();
    await changePassword({ user: null, body: {} }, res, {}, logger);
    expect(res.statusCode).toBe(401);
  });

  it("benötigt aktuelle und neue Passwörter", async () => {
    const res = createMockRes();
    await changePassword(
      { user: { userId: 1 }, body: { currentPassword: "", newPassword: "" } },
      res,
      {},
      logger,
    );
    expect(res.statusCode).toBe(400);
  });

  it("erzwingt neue Passwörter mit ausreichender Länge", async () => {
    const res = createMockRes();
    await changePassword(
      {
        user: { userId: 1 },
        body: { currentPassword: "PasswortAlt", newPassword: "kurz" },
      },
      res,
      {},
      logger,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Password too short");
  });
});
