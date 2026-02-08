import { describe, it, expect, beforeEach, beforeAll, afterEach } from "vitest";
import request from "supertest";
import { setupTestApp } from "./testUtils.js";

beforeAll(() => {
  process.env.JWT_SECRET = "test-secret";
});

describe("Auth API", () => {
  let app;
  let pool;

  beforeEach(async () => {
    const resources = await setupTestApp();
    app = resources.app;
    pool = resources.pool;
  });

  afterEach(async () => {
    if (pool) {
      await pool.end();
    }
  });

  it("registers a new user with hashed password", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: "alice",
        password: "supersecret",
        email: "alice@example.com",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Registrierung erfolgreich" });

    const { rows } = await pool.query(
      "SELECT username, email, password FROM users WHERE username = $1",
      ["alice"],
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].email).toBe("alice@example.com");
    expect(rows[0].password).not.toBe("supersecret");
  });

  it("rejects duplicate usernames", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "bob",
        password: "passwortA",
        email: "bob@example.com",
      });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: "bob",
        password: "passwortB",
        email: "bob2@example.com",
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toContain("Benutzername");
  });

  it("logs in with username and password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "carla",
        password: "sicher123",
        email: "carla@example.com",
      });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "carla", password: "sicher123" });

    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject({
      username: "carla",
      email: "carla@example.com",
    });
    expect(response.body.token).toBeDefined();
  });

  it("rejects login with wrong password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "dora",
        password: "meinPasswort",
        email: "dora@example.com",
      });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "dora", password: "falsch123" });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid password");
  });

  it("validates required fields on register and login", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({ username: "", password: "short" });

    expect(registerResponse.status).toBe(400);

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: "", password: "" });

    expect(loginResponse.status).toBe(400);
  });
});
