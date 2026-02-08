import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { setupTestApp, registerUser, loginUser } from "./testUtils.js";

beforeAll(() => {
  process.env.JWT_SECRET = "test-secret";
});

describe("Profile API", () => {
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

  async function createAuthenticatedUser({
    username = "user1",
    password = "Passwort123!",
    email = "user1@example.com",
  } = {}) {
    await registerUser(app, { username, password, email });
    const loginRes = await loginUser(app, { username, password });
    return { token: loginRes.body.token, username, password, email };
  }

  it("liefert Profilinformationen mit aggregierten Statistiken", async () => {
    const { token, username } = await createAuthenticatedUser({
      username: "trader",
      password: "SehrSicher1",
    });
    const { rows } = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username],
    );
    const userId = rows[0].id;
    await pool.query(
      `INSERT INTO trades (user_id, date, symbol, type, pnl, gewinn, verlust, note, mood, fehler_tags, reflexion, entry_price, exit_price, spread, pips, punkte, pip_mode)
       VALUES ($1, $2, $3, $4, NULL, $5, $6, NULL, NULL, NULL, NULL, $7, $8, NULL, $9, NULL, $10)`,
      [
        userId,
        "2025-01-01",
        "EURUSD",
        "buy",
        120.5,
        80.2,
        1.1234,
        1.1274,
        20.3,
        "pips",
      ],
    );
    await pool.query(
      "INSERT INTO todos (user_id, text, priority) VALUES ($1, $2, $3)",
      [userId, "Psychologie notieren", 2],
    );
    await pool.query(
      "INSERT INTO goals (user_id, text, target, unit) VALUES ($1, $2, $3, $4)",
      [userId, "Mehr Disziplin", 5, "Trades"],
    );

    const response = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.user.username).toBe("trader");
    expect(response.body.stats).toEqual(
      expect.objectContaining({
        trades: 1,
        pnl: expect.any(Number),
        todos: 1,
        goals: 1,
      }),
    );
    expect(Number(response.body.stats.pnl)).toBeCloseTo(40.3, 1);
  });

  it("aktualisiert Psychologie-Werte und validiert Eingaben", async () => {
    const { token } = await createAuthenticatedUser({
      username: "psy-user",
      password: "PsyPass123",
    });

    const invalidResponse = await request(app)
      .put("/api/profile/psychology")
      .set("Authorization", `Bearer ${token}`)
      .send({ motivation: "hoch" })
      .expect(400);

    expect(invalidResponse.body.error).toContain("Ungültiger Wert");

    const validResponse = await request(app)
      .put("/api/profile/psychology")
      .set("Authorization", `Bearer ${token}`)
      .send({ motivation: 11, stress: 5.234 })
      .expect(200);

    expect(validResponse.body.psychology).toEqual(
      expect.objectContaining({ motivation: 10, stress: 5.2 }),
    );
  });

  it("ändert das Passwort nach erfolgreicher Verifikation", async () => {
    const credentials = { username: "change-me", password: "AltesPasswort1" };
    const { token } = await createAuthenticatedUser(credentials);

    await request(app)
      .put("/api/profile/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: credentials.password,
        newPassword: "NeuesPasswort2",
      })
      .expect(200);

    const loginOld = await loginUser(app, credentials);
    expect(loginOld.status).toBe(401);

    const loginNew = await loginUser(app, {
      username: credentials.username,
      password: "NeuesPasswort2",
    });
    expect(loginNew.status).toBe(200);
    expect(loginNew.body.token).toBeDefined();
  });

  it("verhindert Passwortwechsel mit falschem aktuellem Passwort", async () => {
    const credentials = { username: "fail-change", password: "Aktuell123" };
    const { token } = await createAuthenticatedUser(credentials);

    const response = await request(app)
      .put("/api/profile/password")
      .set("Authorization", `Bearer ${token}`)
      .send({ currentPassword: "falsch", newPassword: "NeuPasswort123" });

    expect(response.status).toBe(401);
    expect(response.body.error).toContain("Aktuelles Passwort");
  });

  it("gibt 401 zurück, wenn kein Token übermittelt wird", async () => {
    const response = await request(app).get("/api/profile");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("No token");
  });
});
