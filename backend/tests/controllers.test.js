import { describe, it, expect, vi } from "vitest";
import { getGoals, addGoal, deleteGoal } from "../controllers/goals.js";
import { deleteTodo } from "../controllers/todo.js";
import { deleteTrade, getTradeStats } from "../controllers/trade.js";
import { changePassword, register } from "../controllers/auth.js";
import bcrypt from "bcrypt";

const logger = {
  info: () => {},
  warn: () => {},
  error: () => {},
};

function createRes() {
  return {
    statusCode: 200,
    body: null,
    ended: false,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

describe("Controller-Fehlerpfade", () => {
  it("gibt 401 zurück, wenn getGoals ohne Nutzer aufgerufen wird", async () => {
    const res = createRes();
    await getGoals({ user: null }, res, { query: () => {} }, logger);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toContain("Nicht eingeloggt");
  });

  it("handhabt DB-Fehler beim Hinzufügen eines Ziels", async () => {
    const res = createRes();
    const pool = {
      query: () => {
        throw new Error("db");
      },
    };
    await addGoal(
      { user: { userId: 1 }, body: { text: "Test", target: 1, unit: "x" } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toContain("Fehler beim Hinzufügen");
  });

  it("gibt 500 zurück, wenn deleteGoal fehlschlägt", async () => {
    const res = createRes();
    const pool = {
      query: () => {
        throw new Error("db");
      },
    };
    await deleteGoal(
      { user: { userId: 1 }, params: { id: 1 } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
  });

  it("gibt 500 zurück, wenn deleteTodo fehlschlägt", async () => {
    const res = createRes();
    const pool = {
      query: () => {
        throw new Error("db");
      },
    };
    await deleteTodo(
      { user: { userId: 1 }, params: { id: 1 } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toContain("Failed to delete todo");
  });

  it("meldet 404, wenn deleteTrade keinen Datensatz findet", async () => {
    const res = createRes();
    const pool = { query: async () => ({ rowCount: 0 }) };
    await deleteTrade(
      { user: { userId: 1 }, params: { id: 99 } },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Trade not found");
  });

  it("liefert Statistikdaten auch bei gemischten Trades", async () => {
    const res = createRes();
    const pool = {
      query: async () => ({
        rows: [
          {
            pnl: null,
            gewinn: "120",
            verlust: "30",
            type: "buy",
            pips: "15",
            punkte: null,
            pip_mode: "pips",
          },
          {
            pnl: -50,
            gewinn: "0",
            verlust: "50",
            type: "sell",
            pips: null,
            punkte: "-5",
            pip_mode: "punkte",
          },
        ],
      }),
    };
    await getTradeStats({ user: { userId: 1 } }, res, pool, logger);
    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBe(2);
    expect(res.body.losses).toBeGreaterThan(0);
  });

  it("verhindert Passwortwechsel für OAuth-Nutzer", async () => {
    const res = createRes();
    const pool = {
      query: async (sql) => {
        if (/SELECT password/.test(sql)) {
          return { rows: [{ password: "github_oauth" }] };
        }
        return { rows: [] };
      },
    };
    await changePassword(
      {
        user: { userId: 1 },
        body: { currentPassword: "old", newPassword: "neuesPasswort1" },
      },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("OAuth");
  });

  it("verhindert identische neue Passwörter", async () => {
    const hashed = await bcrypt.hash("OldPasswort1", 10);
    const res = createRes();
    const pool = {
      query: vi.fn(async (sql) => {
        if (/SELECT password/.test(sql)) {
          return { rows: [{ password: hashed }] };
        }
        throw new Error("Unreachable");
      }),
    };
    await changePassword(
      {
        user: { userId: 42 },
        body: { currentPassword: "OldPasswort1", newPassword: "OldPasswort1" },
      },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("unterscheiden");
  });

  it("gibt 404 aus, wenn Nutzer zum Passwortwechsel fehlt", async () => {
    const res = createRes();
    const pool = {
      query: vi.fn(async (sql) => {
        if (/SELECT password/.test(sql)) {
          return { rows: [] };
        }
        throw new Error("Unreachable");
      }),
    };
    await changePassword(
      {
        user: { userId: 99 },
        body: { currentPassword: "Alt12345", newPassword: "Neu12345" },
      },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toContain("User not found");
  });

  it("liefert 500 bei Passwortwechsel-Datenbankfehler", async () => {
    const res = createRes();
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    await changePassword(
      {
        user: { userId: 7 },
        body: { currentPassword: "AltPass1!", newPassword: "NeuPass2!" },
      },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toContain("Passwortänderung fehlgeschlagen");
  });

  it("gibt 500 zurück, wenn die Registrierung fehlschlägt", async () => {
    const res = createRes();
    const pool = {
      query: () => {
        throw new Error("db");
      },
    };
    await register(
      {
        body: {
          username: "failUser",
          password: "Passwort123",
          email: "fail@example.com",
        },
      },
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toContain("Registrierung fehlgeschlagen");
  });
});
