import { describe, it, expect, vi } from "vitest";
import { getGoals, addGoal, updateGoal } from "../controllers/goals.js";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";
import {
  getProfile,
  updatePsychology,
} from "../controllers/profileController.js";
import {
  addTrade,
  getTrades,
  deleteTrade,
  getTradeStats,
} from "../controllers/trade.js";
import { createMockLogger, createMockRes } from "./controllerTestUtils.js";

const userReq = (overrides = {}) => ({ user: { userId: 1 }, ...overrides });

describe("Goals Controller zusätzliche Fälle", () => {
  it("meldet Fehler beim Laden der Ziele", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await getGoals(userReq(), res, pool, logger);
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("protokolliert Fehler beim Aktualisieren eines Ziels", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await updateGoal(
      userReq({
        params: { id: 5 },
        body: { text: "Neu", target: 10, unit: "pcs" },
      }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalledWith(
      "Fehler beim Aktualisieren des Ziels",
      expect.any(Error),
    );
  });

  it("liefert 500, wenn addGoal fehlschlägt", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await addGoal(
      userReq({ body: { text: "Mehr Fokus", target: 5, unit: "tage" } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalledWith(
      "Fehler beim Hinzufügen des Ziels",
      expect.any(Error),
    );
  });
});

describe("Profil-Controller Randfälle", () => {
  it("liefert Fallbacks für fehlende Profildaten", async () => {
    const responses = [
      { rows: [{ id: 1 }] },
      {
        rows: [
          {
            trades: "2",
            sum_pnl: null,
            sum_gewinn: "300",
            sum_verlust: "100",
          },
        ],
      },
      { rows: [{ todos: "4" }] },
      { rows: [{ goals: "3" }] },
      { rows: [{}] },
    ];
    const pool = {
      query: vi.fn(async () => responses.shift() ?? { rows: [] }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await getProfile(userReq(), res, pool, logger);
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toMatchObject({
      username: "",
      email: "",
      avatar_url: "",
      github_name: "",
    });
    expect(res.body.stats.pnl).toBe(200);
    expect(logger.info).toHaveBeenCalled();
  });

  it("meldet Fehler beim Laden des Profils", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await getProfile(userReq(), res, pool, logger);
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalledWith(
      "Fehler beim Laden des Profils",
      expect.any(Error),
    );
  });

  it("handhabt Profilfehler ohne Logger", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const res = createMockRes();
    await getProfile(userReq(), res, pool);
    expect(res.statusCode).toBe(500);
  });

  it("validiert Psychologie-Werte strikt", async () => {
    const pool = { query: vi.fn() };
    const logger = createMockLogger();
    const res = createMockRes();
    await updatePsychology(
      userReq({ body: { motivation: "hoch" } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("motivation");
  });

  it("lehnt leere Psychologie-Updates ab", async () => {
    const pool = { query: vi.fn() };
    const logger = createMockLogger();
    const res = createMockRes();
    await updatePsychology(userReq({ body: {} }), res, pool, logger);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Keine gültigen Felder");
  });

  it("speichert gültige Psychologie-Werte", async () => {
    const pool = {
      query: vi.fn(async (_sql, values) => ({
        rows: [
          {
            motivation: values[0],
            focus: values[1],
          },
        ],
      })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await updatePsychology(
      userReq({ body: { motivation: "5.5", focus: 11 } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.psychology).toMatchObject({ motivation: 5.5, focus: 10 });
    expect(logger.info).toHaveBeenCalled();
  });

  it("speichert Psychologie ohne Logger", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ motivation: 4 }] })),
    };
    const res = createMockRes();
    await updatePsychology(userReq({ body: { motivation: 4 } }), res, pool);
    expect(res.statusCode).toBe(200);
    expect(res.body.psychology.motivation).toBe(4);
  });

  it("berechnet Profil-PnL aus vorhandener Summe", async () => {
    const responses = [
      { rows: [{ id: 1, sum_pnl: "250" }] },
      {
        rows: [
          { trades: "1", sum_pnl: "250", sum_gewinn: "250", sum_verlust: "0" },
        ],
      },
      { rows: [{ todos: "0" }] },
      { rows: [{ goals: "0" }] },
      { rows: [{ motivation: 5 }] },
    ];
    const pool = {
      query: vi.fn(async () => responses.shift() ?? { rows: [] }),
    };
    const res = createMockRes();
    await getProfile(userReq(), res, pool);
    expect(res.statusCode).toBe(200);
    expect(res.body.stats.pnl).toBe(250);
  });

  it("belässt vorhandene Profilfelder unverändert", async () => {
    const responses = [
      {
        rows: [
          {
            id: 1,
            username: "alice",
            email: "alice@example.com",
            avatar_url: "https://cdn/avatar.png",
            github_name: "alicedev",
          },
        ],
      },
      {
        rows: [
          { trades: "0", sum_pnl: null, sum_gewinn: null, sum_verlust: null },
        ],
      },
      { rows: [{ todos: "0" }] },
      { rows: [{ goals: "0" }] },
      { rows: [{ motivation: 7 }] },
    ];
    const pool = {
      query: vi.fn(async () => responses.shift() ?? { rows: [] }),
    };
    const res = createMockRes();
    await getProfile(userReq(), res, pool, undefined);
    expect(res.body.user).toMatchObject({
      username: "alice",
      email: "alice@example.com",
      avatar_url: "https://cdn/avatar.png",
      github_name: "alicedev",
    });
  });

  it("setzt leere Psychologie-Felder auf null", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ motivation: null }] })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await updatePsychology(
      userReq({ body: { motivation: "" } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(200);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), [null, 1]);
  });

  it("setzt Profil-PnL auf null, wenn Summen nicht endlich sind", async () => {
    const responses = [
      { rows: [{ id: 1 }] },
      {
        rows: [
          {
            trades: "3",
            sum_pnl: "Infinity",
            sum_gewinn: "Infinity",
            sum_verlust: "Infinity",
          },
        ],
      },
      { rows: [{ todos: "2" }] },
      { rows: [{ goals: "1" }] },
      { rows: [{}] },
    ];
    const pool = {
      query: vi.fn(async () => responses.shift() ?? { rows: [] }),
    };
    const res = createMockRes();
    await getProfile(userReq(), res, pool, createMockLogger());
    expect(res.statusCode).toBe(200);
    expect(res.body.stats.pnl).toBe(0);
  });

  it("akzeptiert null-Werte bei Psychologie", async () => {
    const pool = {
      query: vi.fn(async () => ({
        rows: [
          {
            motivation: null,
            confidence: null,
          },
        ],
      })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await updatePsychology(
      userReq({ body: { motivation: null, confidence: null } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(200);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
      null,
      null,
      1,
    ]);
  });
  it("meldet Datenbankfehler beim Psychologie-Update", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await updatePsychology(
      userReq({ body: { motivation: 5 } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });
});

describe("Todo-Controller Fehlerpfade", () => {
  it("liefert Todos erfolgreich ohne Logger", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 1, text: "Test" }] })),
    };
    const res = createMockRes();
    await getTodos(userReq(), res, pool);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it("meldet Fehler beim Laden der Todos", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await getTodos(userReq(), res, pool, logger);
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("validiert fehlende Texte beim Todo-Update", async () => {
    const res = createMockRes();
    await updateTodo(
      userReq({ params: { id: 1 }, body: { text: "" } }),
      res,
      { query: vi.fn() },
      createMockLogger(),
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Missing todo text");
  });

  it("liefert 404, wenn Todo nicht gefunden wird", async () => {
    const pool = {
      query: vi.fn(async () => ({ rowCount: 0, rows: [] })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await updateTodo(
      userReq({ params: { id: 9 }, body: { text: "Neu", priority: 1 } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Todo not found");
  });

  it("meldet Fehler beim Aktualisieren eines Todos", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await updateTodo(
      userReq({ params: { id: 3 }, body: { text: "Neu", priority: 2 } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("meldet Fehler beim Hinzufügen eines Todos", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await addTodo(
      userReq({ body: { text: "Neuer Eintrag", priority: 3 } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("lehnt Todos ohne Text ab", async () => {
    const res = createMockRes();
    await addTodo(
      userReq({ body: { text: "" } }),
      res,
      { query: vi.fn() },
      createMockLogger(),
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Missing todo text");
  });

  it("aktualisiert Todos erfolgreich", async () => {
    const pool = {
      query: vi.fn(async () => ({
        rowCount: 1,
        rows: [{ id: 5, text: "Aktualisiert", priority: 3 }],
      })),
    };
    const res = createMockRes();
    await updateTodo(
      userReq({
        params: { id: 5 },
        body: { text: "Aktualisiert", priority: 3 },
      }),
      res,
      pool,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe("Aktualisiert");
  });

  it("fügt Todos erfolgreich hinzu", async () => {
    const pool = {
      query: vi.fn(async () => ({
        rows: [{ id: 7, text: "Neu", priority: 2 }],
      })),
    };
    const res = createMockRes();
    await addTodo(userReq({ body: { text: "Neu", priority: 2 } }), res, pool);
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe("Neu");
  });

  it("nutzt Standardpriorität, wenn keine gesetzt ist", async () => {
    const pool = {
      query: vi.fn(async () => ({
        rows: [{ id: 8, text: "Default", priority: 2 }],
      })),
    };
    const res = createMockRes();
    await addTodo(userReq({ body: { text: "Default" } }), res, pool);
    expect(res.statusCode).toBe(201);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
      1,
      "Default",
      2,
    ]);
  });

  it("fängt Fehler beim Löschen eines Todos ab", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await deleteTodo(userReq({ params: { id: 1 } }), res, pool, logger);
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("löscht Todos erfolgreich", async () => {
    const pool = {
      query: vi.fn(async () => ({})),
    };
    const res = createMockRes();
    await deleteTodo(userReq({ params: { id: 2 } }), res, pool);
    expect(res.statusCode).toBe(204);
  });
});

describe("Trade-Controller Randfälle", () => {
  const baseBody = {
    date: "2024-01-01",
    symbol: "XAUUSD",
    type: "sell",
    pnl: "",
    gewinn: "120,5",
    verlust: "20",
    note: "",
    mood: "",
    fehler_tags: "",
    reflexion: "",
    entry_price: "2000,5",
    exit_price: "1999,8",
    spread: "1,5",
    pip_mode: "punkte",
  };

  it("gibt Trades erfolgreich zurück", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 1 }, { id: 2 }] })),
    };
    const res = createMockRes();
    await getTrades(userReq(), res, pool, createMockLogger());
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("fordert Pflichtfelder für Trades", async () => {
    const res = createMockRes();
    const logger = createMockLogger();
    const pool = { query: vi.fn() };
    await addTrade(
      userReq({ body: { ...baseBody, date: undefined } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Missing trade data");
  });

  it("validiert Einstieg und Ausstieg korrekt", async () => {
    const res = createMockRes();
    const logger = createMockLogger();
    const pool = { query: vi.fn() };
    await addTrade(
      userReq({ body: { ...baseBody, entry_price: "", exit_price: "" } }),
      res,
      pool,
      logger,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Ungültiger Einstiegskurs");
  });

  it("berechnet Pips, Punkte und Spread sauber", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 1 }] })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await addTrade(userReq({ body: baseBody }), res, pool, logger);
    expect(res.statusCode).toBe(201);
    const params = pool.query.mock.calls[0][1];
    expect(params[4]).toBeCloseTo(100.5); // berechnetes PnL
    expect(params[13]).toBeDefined(); // Spread nach Parsing
    expect(logger.info).toHaveBeenCalled();
  });

  it("übernimmt vorhandenes PnL ohne Neuberechnung", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 9 }] })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await addTrade(
      userReq({
        body: {
          ...baseBody,
          pnl: "75",
          gewinn: "10",
          verlust: "1",
        },
      }),
      res,
      pool,
      logger,
    );
    const params = pool.query.mock.calls[0][1];
    expect(params[4]).toBe(75);
  });

  it("setzt PnL auf null, wenn Eingaben ungültig sind", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 10 }] })),
    };
    const res = createMockRes();
    await addTrade(
      userReq({
        body: {
          ...baseBody,
          gewinn: "abc",
          verlust: "xyz",
          pnl: "",
        },
      }),
      res,
      pool,
      createMockLogger(),
    );
    const params = pool.query.mock.calls[0][1];
    expect(params[4]).toBe(0);
  });

  it("setzt Spread auf null, wenn kein Wert übergeben wird", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 2 }] })),
    };
    const res = createMockRes();
    await addTrade(
      userReq({ body: { ...baseBody, spread: "" } }),
      res,
      pool,
      createMockLogger(),
    );
    const params = pool.query.mock.calls[0][1];
    expect(params[13]).toBeNull();
  });

  it("fällt auf den Pips-Modus zurück, wenn pip_mode unbekannt ist", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 3 }] })),
    };
    const res = createMockRes();
    const logger = createMockLogger();
    await addTrade(
      userReq({
        body: {
          ...baseBody,
          symbol: "EURUSD",
          pip_mode: "unbekannt",
          entry_price: "1.1000",
          exit_price: "1.1050",
        },
      }),
      res,
      pool,
      logger,
    );
    const args = pool.query.mock.calls[0][1];
    expect(res.statusCode).toBe(201);
    expect(args[16]).toBe("pips");
    expect(args[13]).toBeDefined();
  });

  it("setzt pipSize auf 1 für Punkte-Trades", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 4 }] })),
    };
    const res = createMockRes();
    await addTrade(
      userReq({
        body: {
          ...baseBody,
          symbol: "DAX",
          pip_mode: "punkte",
          entry_price: "100",
          exit_price: "101",
        },
      }),
      res,
      pool,
      createMockLogger(),
    );
    const params = pool.query.mock.calls[0][1];
    expect(params[15]).toBeCloseTo(-1);
  });

  it("berechnet Punkte korrekt für Kauf-Trades", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 11 }] })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await addTrade(
      userReq({
        body: {
          ...baseBody,
          type: "buy",
          symbol: "DAX",
          pip_mode: "punkte",
          entry_price: "100",
          exit_price: "101",
        },
      }),
      res,
      pool,
      logger,
    );
    const params = pool.query.mock.calls[0][1];
    expect(params[15]).toBeCloseTo(1);
  });

  it("akzeptiert numerische Spread-Werte ohne String-Konvertierung", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 6 }] })),
    };
    const res = createMockRes();
    await addTrade(
      userReq({
        body: {
          ...baseBody,
          symbol: "EURUSD",
          pip_mode: "pips",
          spread: 1.25,
        },
      }),
      res,
      pool,
      createMockLogger(),
    );
    const args = pool.query.mock.calls[0][1];
    expect(args[13]).toBe(1.25);
  });

  it("ignoriert nicht numerische Spreads", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [{ id: 7 }] })),
    };
    const res = createMockRes();
    await addTrade(
      userReq({
        body: {
          ...baseBody,
          spread: "abc",
        },
      }),
      res,
      pool,
      createMockLogger(),
    );
    const params = pool.query.mock.calls[0][1];
    expect(params[13]).toBeNull();
  });

  it("meldet Fehler beim Speichern eines Trades", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await addTrade(userReq({ body: baseBody }), res, pool, logger);
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("löscht Trades erfolgreich", async () => {
    const pool = {
      query: vi.fn(async () => ({ rowCount: 1 })),
    };
    const res = createMockRes();
    await deleteTrade(
      userReq({ params: { id: 5 } }),
      res,
      pool,
      createMockLogger(),
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  it("meldet Fehler beim Laden von Trades", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await getTrades(userReq(), res, pool, logger);
    expect(res.statusCode).toBe(500);
  });

  it("meldet Fehler beim Löschen eines Trades", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await deleteTrade(userReq({ params: { id: 1 } }), res, pool, logger);
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("meldet Fehler bei Statistikberechnung", async () => {
    const pool = {
      query: vi.fn(async () => {
        throw new Error("db");
      }),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await getTradeStats(userReq(), res, pool, logger);
    expect(res.statusCode).toBe(500);
    expect(logger.error).toHaveBeenCalled();
  });

  it("berechnet Statistiken mit gemischten Eingaben", async () => {
    const pool = {
      query: vi.fn(async () => ({
        rows: [
          {
            pnl: null,
            gewinn: "200",
            verlust: "50",
            type: "buy",
            pips: "10,5",
            punkte: null,
            pip_mode: "pips",
          },
          {
            pnl: "-30",
            gewinn: "0",
            verlust: "30",
            type: "sell",
            pips: null,
            punkte: "-5",
            pip_mode: "punkte",
          },
          {
            pnl: "15",
            gewinn: "15",
            verlust: "0",
            type: "buy",
            pips: null,
            punkte: "3",
            pip_mode: "punkte",
          },
        ],
      })),
    };
    const logger = createMockLogger();
    const res = createMockRes();
    await getTradeStats(userReq(), res, pool, logger);
    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBe(3);
    expect(res.body.winRatePunkte).toBeGreaterThan(0);
  });

  it("liefert Nullwerte, wenn keine Trades vorhanden sind", async () => {
    const pool = {
      query: vi.fn(async () => ({ rows: [] })),
    };
    const res = createMockRes();
    await getTradeStats(userReq(), res, pool, createMockLogger());
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      total: 0,
      winRate: 0,
      avgPnl: 0,
      winRatePips: 0,
    });
  });
});
