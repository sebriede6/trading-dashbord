import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { setupTestApp, registerUser, loginUser } from "./testUtils.js";

// Demonstriert einen kompletten Flow über mehrere Endpunkte hinweg
// und gibt Zwischenschritte auf der Konsole aus, damit der Ablauf
// live verfolgt werden kann.
describe("End-to-End Demo Flow", () => {
  let app;
  let pool;
  let authHeader;

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-secret";
    const resources = await setupTestApp();
    app = resources.app;
    pool = resources.pool;
    const username = `demo_${Math.random().toString(36).slice(2, 8)}`;
    const password = "DemoPass123!";
    console.log("Registriere Demo-Nutzer...");
    await registerUser(app, {
      username,
      password,
      email: `${username}@example.com`,
    });
    console.log("Melde Demo-Nutzer an...");
    const loginRes = await loginUser(app, { username, password });
    authHeader = { Authorization: `Bearer ${loginRes.body.token}` };
  });

  afterAll(async () => {
    if (pool) {
      await pool.end();
    }
  });

  it("führt den Dashboard-Flow durch", async () => {
    console.log("Setze Startkapital...");
    await request(app)
      .post("/api/startkapital")
      .set(authHeader)
      .send({ startkapital: 10000 })
      .expect(200);

    console.log("Lege ein Todo an...");
    const todoRes = await request(app)
      .post("/api/todos")
      .set(authHeader)
      .send({ text: "Demo Todo", priority: 2 })
      .expect(201);
    console.log("Todo angelegt:", todoRes.body);

    console.log("Lege ein Ziel an...");
    const goalRes = await request(app)
      .post("/api/goals")
      .set(authHeader)
      .send({ text: "Mehr Fokus", target: 5, unit: "Sessions" })
      .expect(201);
    console.log("Ziel angelegt:", goalRes.body);

    console.log("Lege einen Trade an...");
    const tradeRes = await request(app)
      .post("/api/trades")
      .set(authHeader)
      .send({
        date: "2025-02-08",
        symbol: "EURUSD",
        type: "buy",
        entry_price: 1.1,
        exit_price: 1.105,
        pip_mode: "pips",
        gewinn: 150,
        verlust: 10,
        note: "Demo-Setup",
      })
      .expect(201);
    console.log("Trade angelegt:", tradeRes.body);

    console.log("Rufe Handelsstatistiken ab...");
    const statsRes = await request(app)
      .get("/api/trades/stats")
      .set(authHeader)
      .expect(200);
    expect(statsRes.body.total).toBe(1);
    expect(statsRes.body.sumPnl).toBeGreaterThan(0);
    console.log("Trade-Stats:", statsRes.body);

    console.log("Rufe Profil zusammen...");
    const profileRes = await request(app)
      .get("/api/profile")
      .set(authHeader)
      .expect(200);
    expect(profileRes.body.stats.todos).toBe(1);
    expect(profileRes.body.stats.trades).toBe(1);
    expect(profileRes.body.stats.pnl).toBeGreaterThan(0);
    console.log("Profil-Statistik:", profileRes.body.stats);

    console.log("End-to-End Demo abgeschlossen.");
  });
});
