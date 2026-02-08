import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import request from "supertest";
import winston from "winston";
import { createMockLogger } from "./controllerTestUtils.js";

const routeState = { throwError: false };

function stubRoute(name) {
  return () => {
    const router = express.Router();
    router.get(`/${name}`, (_req, res) => {
      if (routeState.throwError) {
        throw new Error(`${name}-boom`);
      }
      res.json({ route: name });
    });
    return router;
  };
}

function setupModuleMocks() {
  vi.doMock("../routes/auth.js", () => ({
    __esModule: true,
    default: stubRoute("auth"),
  }));
  vi.doMock("../routes/todo.js", () => ({
    __esModule: true,
    default: stubRoute("todo"),
  }));
  vi.doMock("../routes/trade.js", () => ({
    __esModule: true,
    default: stubRoute("trade"),
  }));
  vi.doMock("../routes/startkapital.js", () => ({
    __esModule: true,
    default: stubRoute("startkapital"),
  }));
  vi.doMock("../routes/goals.js", () => ({
    __esModule: true,
    default: stubRoute("goals"),
  }));
  vi.doMock("../routes/profile.js", () => ({
    __esModule: true,
    default: stubRoute("profile"),
  }));
  vi.doMock("../routes/github.js", () => {
    const router = express.Router();
    router.get("/github", (_req, res) => res.json({ ok: true }));
    router.get("/github/callback", (_req, res) => res.json({ ok: true }));
    return {
      __esModule: true,
      default: router,
      createGitHubRouter: () => router,
    };
  });
  vi.doMock("pg", () => {
    const PoolMock = vi.fn(function PoolMock() {
      return {
        query: vi.fn(),
        on: vi.fn(),
        end: vi.fn(),
      };
    });
    return { Pool: PoolMock };
  });
}

const originalNodeEnv = process.env.NODE_ENV;

beforeEach(() => {
  vi.resetModules();
  routeState.throwError = false;
  process.env.NODE_ENV = "test";
  setupModuleMocks();
});

afterEach(() => {
  process.env.NODE_ENV = originalNodeEnv;
  vi.clearAllMocks();
});

describe("Server-Modul", () => {
  it("liefert ein Fallback für fehlende Prozess-Umgebung", async () => {
    const { resolveProcessEnv, resolvePort } = await import("../server.js");
    expect(resolveProcessEnv(null)).toEqual({});
    expect(resolveProcessEnv({ env: { PORT: "5555" } })).toEqual({
      PORT: "5555",
    });
    expect(resolvePort({ PORT: "8080" })).toBe(8080);
    expect(resolvePort({})).toBe(3000);
    expect(resolvePort({ PORT: "abc" })).toBe("abc");
  });

  it("formatiert Logger-Nachrichten mit Metadaten", async () => {
    const { createLogger } = await import("../server.js");
    const logger = createLogger({
      transports: [new winston.transports.Console({ silent: true })],
    });
    expect(() => logger.info("test", { path: "/health" })).not.toThrow();
  });

  it("protokolliert Requests und nutzt den Fehler-Handler", async () => {
    const { createApp } = await import("../server.js");
    const logger = createMockLogger();
    const pool = { query: vi.fn() };
    const app = createApp(pool, logger);

    await request(app).get("/api/auth/auth");
    expect(logger.info).toHaveBeenCalledWith("GET /api/auth/auth");

    routeState.throwError = true;
    const response = await request(app).get("/api/auth/auth");
    expect(response.status).toBe(500);
    expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
  });

  it("startet den HTTP-Server außerhalb der Testumgebung", async () => {
    process.env.NODE_ENV = "development";
    const originalListen = express.application.listen;
    const listenSpy = vi.fn(function (_port, callback) {
      callback?.();
      return this;
    });
    express.application.listen = listenSpy;

    await import("../server.js");

    expect(listenSpy).toHaveBeenCalled();
    express.application.listen = originalListen;
  });
});
