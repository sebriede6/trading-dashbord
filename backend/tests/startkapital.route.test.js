import express from "express";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";

import createStartkapitalRouter from "../routes/startkapital.js";

vi.mock("../controllers/auth.js", async () => {
  const actual = await vi.importActual("../controllers/auth.js");
  return {
    ...actual,
    authenticate: (req, _res, next) => {
      req.user = { userId: 1 };
      next();
    },
  };
});

describe("startkapital routes", () => {
  const createApp = (pool, logger = { error: vi.fn() }) => {
    const app = express();
    app.use(express.json());
    app.use("/api/startkapital", createStartkapitalRouter(pool, logger));
    return { app, logger };
  };

  it("returns the current startkapital", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ startkapital: 5000 }] })),
    };
    const { app } = createApp(pool);

    const res = await request(app).get("/api/startkapital");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ startkapital: 5000 });
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT startkapital FROM users WHERE id = $1",
      [1],
    );
  });

  it("responds with 404 when user is missing", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [] })),
    };
    const { app } = createApp(pool);

    const res = await request(app).get("/api/startkapital");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "User not found" });
  });

  it("handles database errors when loading startkapital", async () => {
    const dbError = new Error("boom");
    const pool = {
      query: vi.fn(async () => {
        throw dbError;
      }),
    };
    const logger = { error: vi.fn() };
    const { app } = createApp(pool, logger);

    const res = await request(app).get("/api/startkapital");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to fetch startkapital" });
    expect(logger.error).toHaveBeenCalledWith(dbError);
  });

  it("rejects updates without startkapital", async () => {
    const pool = { query: vi.fn() };
    const { app } = createApp(pool);

    const res = await request(app).post("/api/startkapital").send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Missing startkapital" });
    expect(pool.query).not.toHaveBeenCalled();
  });

  it("updates startkapital successfully", async () => {
    const pool = { query: vi.fn(async () => ({ rows: [] })) };
    const { app } = createApp(pool);

    const res = await request(app)
      .post("/api/startkapital")
      .send({ startkapital: 7500 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE users SET startkapital = $1 WHERE id = $2",
      [7500, 1],
    );
  });

  it("handles database errors when updating startkapital", async () => {
    const dbError = new Error("update failed");
    const pool = {
      query: vi.fn(async () => {
        throw dbError;
      }),
    };
    const logger = { error: vi.fn() };
    const { app } = createApp(pool, logger);

    const res = await request(app)
      .post("/api/startkapital")
      .send({ startkapital: 9000 });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to update startkapital" });
    expect(logger.error).toHaveBeenCalledWith(dbError);
  });
});
