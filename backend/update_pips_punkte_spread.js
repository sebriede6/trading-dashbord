// Script: update_pips_punkte_spread.js
// Einmal ausführen, um für alle bestehenden Trades pips, punkte und spread nachzutragen
// Nutzung: node update_pips_punkte_spread.js

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/appdb",
});

async function updateAllTrades() {
  const res = await pool.query(
    "SELECT id, type, entry_price, exit_price, pip_mode FROM trades",
  );
  for (const trade of res.rows) {
    const entry = parseFloat(trade.entry_price);
    const exit = parseFloat(trade.exit_price);
    if (isNaN(entry) || isNaN(exit)) continue;
    // Spread immer absolut und auf 5 Nachkommastellen
    const spread = Math.round(Math.abs(entry - exit) * 100000) / 100000;
    const diff = trade.type === "buy" ? exit - entry : entry - exit;
    let pips = null,
      punkte = null;
    if (trade.pip_mode === "punkte") {
      punkte = Math.round(diff * 100 * 100) / 100;
    } else if (trade.pip_mode === "pips") {
      pips = Math.round(diff * 10000 * 100) / 100;
    } else {
      pips = Math.round(diff * 10000 * 100) / 100;
    }
    await pool.query(
      "UPDATE trades SET spread = $1, pips = $2, punkte = $3 WHERE id = $4",
      [spread, pips, punkte, trade.id],
    );
    console.log(`Trade ${trade.id} aktualisiert.`);
  }
  await pool.end();
  console.log("Fertig!");
}

updateAllTrades().catch((e) => {
  console.error(e);
  process.exit(1);
});
