import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, expect, it, vi } from "vitest";

import { createGitHubRouter } from "../routes/github.js";

describe("github oauth routes", () => {
  const buildApp = (overrides = {}) => {
    const logger = overrides.logger ?? { info: vi.fn(), error: vi.fn() };
    const router = createGitHubRouter({
      pool: overrides.pool,
      axiosClient: overrides.axiosClient,
      jwtSecret: overrides.jwtSecret ?? "test-secret",
      clientId: overrides.clientId ?? "client-id",
      clientSecret: overrides.clientSecret ?? "client-secret",
      frontendUrl: overrides.frontendUrl ?? "http://frontend.test",
      logger,
    });
    const app = express();
    app.use(router);
    return { app, logger };
  };

  it("redirects to GitHub on login", async () => {
    const { app } = buildApp();

    const res = await request(app).get("/github");

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain(
      "https://github.com/login/oauth/authorize",
    );
    expect(res.headers.location).toContain("client_id=client-id");
  });

  it("rejects callback when code is missing", async () => {
    const { app } = buildApp();

    const res = await request(app).get("/github/callback");

    expect(res.status).toBe(400);
    expect(res.text).toBe("Code fehlt");
  });

  it("creates a user when none exists and redirects with jwt", async () => {
    const poolQuery = vi.fn(async (sql, params) => {
      if (sql.includes("SELECT")) {
        return { rows: [] };
      }
      if (sql.includes("INSERT")) {
        return {
          rows: [
            {
              id: 42,
              username: params[0],
              email: params[1],
            },
          ],
        };
      }
      throw new Error("Unexpected query");
    });

    const axiosGet = vi
      .fn()
      .mockResolvedValueOnce({ data: { login: "octocat", email: null } })
      .mockResolvedValueOnce({
        data: [{ email: "octo@example.com", primary: true }],
      });

    const axiosClient = {
      post: vi.fn(async () => ({ data: { access_token: "token-123" } })),
      get: axiosGet,
    };

    const { app } = buildApp({ pool: { query: poolQuery }, axiosClient });

    const res = await request(app)
      .get("/github/callback")
      .query({ code: "abc123" });

    expect(res.status).toBe(302);
    expect(poolQuery).toHaveBeenCalledTimes(2);
    expect(axiosClient.post).toHaveBeenCalledOnce();
    expect(axiosClient.get).toHaveBeenCalledTimes(2);

    const redirectUrl = new URL(res.headers.location);
    expect(redirectUrl.origin).toBe("http://frontend.test");
    expect(redirectUrl.pathname).toBe("/github-success");
    const token = redirectUrl.searchParams.get("token");
    expect(token).toBeTruthy();

    const payload = jwt.verify(token, "test-secret");
    expect(payload).toMatchObject({
      username: "octocat",
      email: "octo@example.com",
      userId: 42,
    });
  });

  it("returns existing users without inserting", async () => {
    const poolQuery = vi.fn(async (sql) => {
      if (sql.includes("SELECT")) {
        return {
          rows: [
            {
              id: 21,
              username: "octocat",
              email: "octo@example.com",
            },
          ],
        };
      }
      throw new Error("Unexpected query");
    });

    const axiosClient = {
      post: vi.fn(async () => ({ data: { access_token: "token-xyz" } })),
      get: vi.fn(async () => ({
        data: { login: "octocat", email: "octo@example.com" },
      })),
    };

    const { app } = buildApp({ pool: { query: poolQuery }, axiosClient });

    const res = await request(app)
      .get("/github/callback")
      .query({ code: "with-user" });

    expect(res.status).toBe(302);
    expect(poolQuery).toHaveBeenCalledTimes(1);
    expect(axiosClient.get).toHaveBeenCalledTimes(1);
  });

  it("handles database failures during user lookup", async () => {
    const dbError = new Error("db broke");
    const poolQuery = vi.fn(async () => {
      throw dbError;
    });

    const axiosClient = {
      post: vi.fn(async () => ({ data: { access_token: "token-err" } })),
      get: vi.fn(async () => ({
        data: { login: "octocat", email: "octo@example.com" },
      })),
    };

    const logger = { info: vi.fn(), error: vi.fn() };
    const { app } = buildApp({
      pool: { query: poolQuery },
      axiosClient,
      logger,
    });

    const res = await request(app)
      .get("/github/callback")
      .query({ code: "fail" });

    expect(res.status).toBe(500);
    expect(res.text).toBe("DB-Fehler bei User-Anlage");
    expect(logger.error).toHaveBeenCalledWith(
      "[GitHub-OAuth] DB-Fehler bei User-Anlage",
      dbError,
    );
  });

  it("bubbles up unexpected errors", async () => {
    const axiosClient = {
      post: vi.fn(async () => {
        throw new Error("axios failure");
      }),
      get: vi.fn(),
    };

    const logger = { info: vi.fn(), error: vi.fn() };
    const { app } = buildApp({ axiosClient, logger });

    const res = await request(app)
      .get("/github/callback")
      .query({ code: "oops" });

    expect(res.status).toBe(500);
    expect(res.text).toBe("GitHub Login fehlgeschlagen");
    expect(logger.error).toHaveBeenCalledWith(
      "[GitHub-OAuth] Fehler im Callback",
      expect.any(Error),
    );
  });
});
