import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { setupTestApp, registerUser, loginUser } from "./testUtils.js";

beforeAll(() => {
  process.env.JWT_SECRET = "test-secret";
});

describe("Geschützte API-Ressourcen", () => {
  let app;
  let pool;
  let token;
  let userId;

  beforeEach(async () => {
    const resources = await setupTestApp();
    app = resources.app;
    pool = resources.pool;
    const username = `user_${Math.random().toString(36).slice(2, 8)}`;
    const password = "SehrSicher123";
    await registerUser(app, {
      username,
      password,
      email: `${username}@example.com`,
    });
    const loginRes = await loginUser(app, { username, password });
    token = loginRes.body.token;
    const idRes = await pool.query("SELECT id FROM users WHERE username = $1", [
      username,
    ]);
    userId = idRes.rows[0].id;
  });

  afterEach(async () => {
    if (pool) {
      await pool.end();
    }
  });

  function auth() {
    return { Authorization: `Bearer ${token}` };
  }

  it("verwaltet Todos komplett inklusive Validierung", async () => {
    const createRes = await request(app)
      .post("/api/todos")
      .set(auth())
      .send({ text: "Erstes Todo", priority: 1 })
      .expect(201);

    expect(createRes.body).toMatchObject({ text: "Erstes Todo", priority: 1 });

    const listRes = await request(app)
      .get("/api/todos")
      .set(auth())
      .expect(200);
    expect(listRes.body).toHaveLength(1);

    const updated = await request(app)
      .put(`/api/todos/${createRes.body.id}`)
      .set(auth())
      .send({ text: "Update", priority: 3 })
      .expect(200);
    expect(updated.body.priority).toBe(3);

    const missingText = await request(app)
      .post("/api/todos")
      .set(auth())
      .send({})
      .expect(400);
    expect(missingText.body.error).toContain("Missing todo text");

    await request(app)
      .delete(`/api/todos/${createRes.body.id}`)
      .set(auth())
      .expect(204);

    const afterDelete = await request(app)
      .get("/api/todos")
      .set(auth())
      .expect(200);
    expect(afterDelete.body).toHaveLength(0);
  });

  it("weist ungültige Todo-Updates zurück", async () => {
    const created = await request(app)
      .post("/api/todos")
      .set(auth())
      .send({ text: "Todo", priority: 2 })
      .expect(201);

    const missingText = await request(app)
      .put(`/api/todos/${created.body.id}`)
      .set(auth())
      .send({ priority: 1 })
      .expect(400);
    expect(missingText.body.error).toContain("Missing todo text");

    await request(app)
      .put(`/api/todos/9999`)
      .set(auth())
      .send({ text: "Nicht vorhanden", priority: 3 })
      .expect(404);
  });

  it("pflegt Ziele inklusive Update und Delete", async () => {
    const createRes = await request(app)
      .post("/api/goals")
      .set(auth())
      .send({ text: "Mehr Trades", target: 10, unit: "Trades" })
      .expect(201);

    const listRes = await request(app)
      .get("/api/goals")
      .set(auth())
      .expect(200);
    expect(listRes.body[0].text).toBe("Mehr Trades");

    const updatedRes = await request(app)
      .put(`/api/goals/${createRes.body.id}`)
      .set(auth())
      .send({ text: "Weniger Fehler", target: 5, unit: "Fehler" })
      .expect(200);
    expect(updatedRes.body.text).toBe("Weniger Fehler");

    await request(app)
      .delete(`/api/goals/${createRes.body.id}`)
      .set(auth())
      .expect(200);

    const emptyGoals = await request(app)
      .get("/api/goals")
      .set(auth())
      .expect(200);
    expect(emptyGoals.body).toHaveLength(0);
  });

  it("setzt und liest Startkapital mit Validierung", async () => {
    const missing = await request(app)
      .post("/api/startkapital")
      .set(auth())
      .send({})
      .expect(400);
    expect(missing.body.error).toContain("Missing startkapital");

    await request(app)
      .post("/api/startkapital")
      .set(auth())
      .send({ startkapital: 15000 })
      .expect(200);

    const getRes = await request(app)
      .get("/api/startkapital")
      .set(auth())
      .expect(200);

    expect(getRes.body.startkapital).toBe(15000);
  });

  it("erstellt Trades und generiert Statistiken", async () => {
    const tradeBody = {
      date: "2025-01-01",
      symbol: "EURUSD",
      type: "buy",
      entry_price: 1.1,
      exit_price: 1.105,
      pip_mode: "pips",
      gewinn: 120,
      verlust: 20,
      note: "Testtrade",
    };

    const createRes = await request(app)
      .post("/api/trades")
      .set(auth())
      .send(tradeBody)
      .expect(201);

    expect(createRes.body.symbol).toBe("EURUSD");
    expect(createRes.body.pips).toBeDefined();

    const listRes = await request(app)
      .get("/api/trades")
      .set(auth())
      .expect(200);
    expect(listRes.body).toHaveLength(1);

    const statsRes = await request(app)
      .get("/api/trades/stats")
      .set(auth())
      .expect(200);
    expect(statsRes.body.total).toBe(1);
    expect(statsRes.body.sumPnl).toBeGreaterThan(0);

    const deleteRes = await request(app)
      .delete(`/api/trades/${createRes.body.id}`)
      .set(auth())
      .expect(200);
    expect(deleteRes.body.success).toBe(true);

    const listAfterDelete = await request(app)
      .get("/api/trades")
      .set(auth())
      .expect(200);
    expect(listAfterDelete.body).toHaveLength(0);
  });

  it("lehnt ungültige Trades ab", async () => {
    await request(app)
      .post("/api/trades")
      .set(auth())
      .send({
        symbol: "EURUSD",
        type: "buy",
        entry_price: 1.1,
        exit_price: 1.2,
        pip_mode: "pips",
      })
      .expect(400);

    await request(app)
      .post("/api/trades")
      .set(auth())
      .send({
        date: "2025-01-01",
        symbol: "EURUSD",
        type: "buy",
        entry_price: 0,
        exit_price: 1.2,
        pip_mode: "pips",
      })
      .expect(400);
  });

  it("verhindert das Löschen fremder Todos", async () => {
    const foreignUser = {
      username: "fremd",
      password: "FremdPass123",
      email: "fremd@example.com",
    };
    await registerUser(app, foreignUser);
    const { rows } = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [foreignUser.username],
    );
    const foreignId = rows[0].id;
    const todo = await pool.query(
      "INSERT INTO todos (user_id, text, priority) VALUES ($1, $2, $3) RETURNING id",
      [foreignId, "Andere Aufgabe", 2],
    );

    await request(app)
      .delete(`/api/todos/${todo.rows[0].id}`)
      .set(auth())
      .expect(204);

    const stillExists = await pool.query("SELECT * FROM todos WHERE id = $1", [
      todo.rows[0].id,
    ]);
    expect(stillExists.rowCount).toBe(1);
  });
});
