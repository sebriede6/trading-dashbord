export async function getTrades(req, res, pool, logger) {
  try {
    const result = await pool.query(
      "SELECT * FROM trades WHERE user_id = $1 ORDER BY date DESC, id DESC",
      [req.user.userId],
    );
    res.json(result.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Failed to fetch trades" });
  }
}

export async function addTrade(req, res, pool, logger) {
  // --- Clean function start: always destructure first ---
  let {
    date,
    symbol,
    type,
    pnl,
    gewinn,
    verlust,
    note,
    mood,
    fehler_tags,
    reflexion,
    entry_price,
    exit_price,
    spread,
    pip_mode,
  } = req.body;

  // Korrekte Berechnung von pnl, falls nicht gesetzt oder leer
  let validGewinn =
    typeof gewinn === "number"
      ? gewinn
      : Number(String(gewinn).replace(",", "."));
  let validVerlust =
    typeof verlust === "number"
      ? verlust
      : Number(String(verlust).replace(",", "."));
  let validPnl =
    typeof pnl === "number" ? pnl : Number(String(pnl).replace(",", "."));
  if (isNaN(validPnl) || validPnl === 0) {
    validPnl = validGewinn - validVerlust;
  }
  if (isNaN(validPnl)) validPnl = 0;

  // Debug-Logging für Berechnung
  logger.info(
    `Trade-Berechnung: Symbol=${symbol}, pip_mode=${pip_mode}, entry_price=${entry_price}, exit_price=${exit_price}`,
  );

  // pip_mode immer auf 'pips' oder 'punkte' setzen, nie leer
  if (pip_mode !== "pips" && pip_mode !== "punkte") pip_mode = "pips";
  if (!date || !symbol || !type) {
    return res.status(400).json({ error: "Missing trade data" });
  }

  // Logging für Debug
  logger.info("addTrade req.body:", req.body);

  function toNull(val) {
    if (val === undefined || val === null) return null;
    if (typeof val === "string" && val.trim() === "") return null;
    return val;
  }

  // Spread und Pips/Punkte robust berechnen (auch wenn pip_mode fehlt)
  let pips = null,
    punkte = null,
    spreadFinal = null;

  // Robustes Parsen inkl. Komma als Dezimaltrennzeichen
  const entry = parseFloat(String(entry_price).replace(",", "."));
  const exit = parseFloat(String(exit_price).replace(",", "."));

  // Validierung: Kurs muss vorhanden und > 0 sein
  if (!entry || !exit || isNaN(entry) || isNaN(exit)) {
    return res
      .status(400)
      .json({ error: "Ungültiger Einstiegskurs oder Schlusskurs" });
  }

  // Spread: Nur übernehmen, wenn explizit eingegeben (auch Komma als Dezimaltrennzeichen akzeptieren), sonst null
  if (toNull(spread) !== null) {
    let spreadNum = spread;
    if (typeof spreadNum === "string") {
      spreadNum = spreadNum.replace(",", ".");
    }
    if (!isNaN(Number(spreadNum))) {
      spreadFinal = Number(spreadNum);
    }
  } else {
    spreadFinal = null;
  }

  // Pips/Punkte werden korrekt mit pipSize berechnet
  let pipSize = 1;
  // Symbol-spezifische pipSize
  if (symbol && symbol.toUpperCase() === "XAUUSD") {
    pipSize = 0.1; // Gold: 1 Pip = 0.1
  } else if (pip_mode === "pips") {
    pipSize = 0.0001; // Standard Forex
  } else if (pip_mode === "punkte") {
    pipSize = 1;
  }
  const diff = type === "buy" ? exit - entry : entry - exit;
  const roundedDiff = Math.round((diff / pipSize) * 100) / 100;
  if (pip_mode === "punkte") {
    punkte = Number.isFinite(roundedDiff) ? roundedDiff : 0;
  } else {
    pips = Number.isFinite(roundedDiff) ? roundedDiff : 0;
  }
  try {
    const result = await pool.query(
      `INSERT INTO trades (user_id, date, symbol, type, pnl, gewinn, verlust, note, mood, fehler_tags, reflexion, entry_price, exit_price, spread, pips, punkte, pip_mode)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [
        req.user.userId,
        date,
        symbol,
        type,
        validPnl,
        validGewinn,
        validVerlust,
        toNull(note),
        toNull(mood),
        toNull(fehler_tags),
        toNull(reflexion),
        toNull(entry_price),
        toNull(exit_price),
        spreadFinal,
        pips,
        punkte,
        pip_mode,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Failed to add trade" });
  }
}

export async function deleteTrade(req, res, pool, logger) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM trades WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.userId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Trade not found" });
    }
    res.json({ success: true });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Failed to delete trade" });
  }
}

// Trading-Statistiken für den eingeloggten User
export async function getTradeStats(req, res, pool, logger) {
  try {
    const result = await pool.query(
      "SELECT pnl, gewinn, verlust, type, pips, punkte, pip_mode FROM trades WHERE user_id = $1",
      [req.user.userId],
    );
    const trades = result.rows;
    const total = trades.length;
    let sumPnl = 0,
      wins = 0,
      losses = 0,
      sumGewinn = 0,
      sumVerlust = 0,
      sumPips = 0,
      sumPunkte = 0,
      countPips = 0,
      countPunkte = 0,
      winPips = 0,
      winPunkte = 0;
    trades.forEach((t) => {
      // Robust: null, undefined, leere Strings, nicht-numerisch
      let pnl =
        typeof t.pnl === "number"
          ? t.pnl
          : Number(String(t.pnl).replace(",", "."));
      let gewinn =
        typeof t.gewinn === "number"
          ? t.gewinn
          : Number(String(t.gewinn).replace(",", "."));
      let verlust =
        typeof t.verlust === "number"
          ? t.verlust
          : Number(String(t.verlust).replace(",", "."));
      let pips =
        typeof t.pips === "number"
          ? t.pips
          : Number(String(t.pips).replace(",", "."));
      let punkte =
        typeof t.punkte === "number"
          ? t.punkte
          : Number(String(t.punkte).replace(",", "."));
      if (isNaN(pips) || pips === null) pips = 0;
      if (isNaN(punkte) || punkte === null) punkte = 0;
      const validGewinn = isNaN(gewinn) ? 0 : gewinn;
      const validVerlust = isNaN(verlust) ? 0 : verlust;
      if (isNaN(pnl) || pnl === 0) {
        pnl = validGewinn - validVerlust;
      }
      const validPnl = isNaN(pnl) ? 0 : pnl;
      sumPnl += validPnl;
      if (validPnl > 0) wins++;
      if (validPnl < 0) losses++;
      sumGewinn += validGewinn;
      sumVerlust += validVerlust;
      // Zähle ALLE Trades, egal ob pip_mode gesetzt ist
      sumPips += pips;
      countPips++;
      if (pips > 0) winPips++;
      sumPunkte += punkte;
      countPunkte++;
      if (punkte > 0) winPunkte++;
    });
    const winRate = total ? (wins / total) * 100 : 0;
    const avgPnl = total ? sumPnl / total : 0;
    const avgGewinn = wins ? sumGewinn / wins : 0;
    const avgVerlust = losses ? sumVerlust / losses : 0;
    const avgPips = countPips ? sumPips / countPips : 0;
    const avgPunkte = countPunkte ? sumPunkte / countPunkte : 0;
    const winRatePips = countPips ? (winPips / countPips) * 100 : 0;
    const winRatePunkte = countPunkte ? (winPunkte / countPunkte) * 100 : 0;
    res.json({
      total,
      sumPnl,
      wins,
      losses,
      winRate,
      avgPnl,
      avgGewinn,
      avgVerlust,
      sumPips,
      avgPips,
      winRatePips,
      sumPunkte,
      avgPunkte,
      winRatePunkte,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Failed to fetch trade stats" });
  }
}
