import { describe, it, expect, beforeAll } from "vitest";
import { setupTestApp, registerUser, loginUser } from "./testUtils.js";

beforeAll(() => {
  process.env.JWT_SECRET = "utils-secret";
});

describe("Test-Hilfsfunktionen", () => {
  it("können Nutzer registrieren und anmelden", async () => {
    const { app, pool } = await setupTestApp();
    try {
      const registerResponse = await registerUser(app, {
        username: "helper",
        password: "Passwort123",
        email: "helper@example.com",
      });
      expect(registerResponse.status).toBe(201);

      const loginResponse = await loginUser(app, {
        username: "helper",
        password: "Passwort123",
      });
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.token).toBeTruthy();
    } finally {
      await pool.end();
    }
  });
});
