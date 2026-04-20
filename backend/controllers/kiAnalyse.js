// KI-Auswertung für Trades: Muster, Tipps, Stimmung, Fehler

// Einfache Mustererkennung und Tipps
function analyseTrades(trades) {
  if (!Array.isArray(trades) || trades.length === 0) {
    return {
      patterns: [],
      tips: ["Keine Trades vorhanden."],
      moodStats: {},
      fehlerStats: {},
    };
  }
  // Muster: Gewinn-/Verlustserie, häufige Fehler, Stimmungstrends
  let winStreak = 0,
    lossStreak = 0,
    maxWinStreak = 0,
    maxLossStreak = 0;
  let lastResult = null;
  const moodStats = {};
  const fehlerStats = {};
  let sumPnl = 0;
  trades.forEach((trade) => {
    // Gewinn/Verlust
    const pnl = Number(trade.pnl) || 0;
    sumPnl += pnl;
    if (pnl > 0) {
      if (lastResult === "win") winStreak++;
      else winStreak = 1;
      lossStreak = 0;
      maxWinStreak = Math.max(maxWinStreak, winStreak);
      lastResult = "win";
    } else if (pnl < 0) {
      if (lastResult === "loss") lossStreak++;
      else lossStreak = 1;
      winStreak = 0;
      maxLossStreak = Math.max(maxLossStreak, lossStreak);
      lastResult = "loss";
    } else {
      winStreak = 0;
      lossStreak = 0;
      lastResult = null;
    }
    // Stimmung
    if (trade.mood) {
      moodStats[trade.mood] = (moodStats[trade.mood] || 0) + 1;
    }
    // Fehler-Tags
    if (trade.fehler_tags) {
      String(trade.fehler_tags)
        .split(",")
        .forEach((tag) => {
          const t = tag.trim();
          if (t) fehlerStats[t] = (fehlerStats[t] || 0) + 1;
        });
    }
  });
  // Muster
  const patterns = [];
  if (maxWinStreak >= 3) patterns.push(`Längste Gewinnserie: ${maxWinStreak}`);
  if (maxLossStreak >= 3)
    patterns.push(`Längste Verlustserie: ${maxLossStreak}`);
  if (sumPnl > 0) patterns.push(`Gesamtergebnis positiv: ${sumPnl.toFixed(2)}`);
  if (sumPnl < 0) patterns.push(`Gesamtergebnis negativ: ${sumPnl.toFixed(2)}`);
  // Tipps
  const tips = [];
  if (maxLossStreak >= 3)
    tips.push(
      "Achte auf Verlustserien – vielleicht Pause machen oder Strategie prüfen.",
    );
  if (Object.keys(fehlerStats).length > 0) {
    const häufigsterFehler = Object.entries(fehlerStats).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
    tips.push(
      `Häufigster Fehler: ${häufigsterFehler}. Versuche, diesen gezielt zu vermeiden.`,
    );
  }
  if (Object.keys(moodStats).length > 0) {
    const häufigsteStimmung = Object.entries(moodStats).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
    tips.push(
      `Deine häufigste Stimmung: ${häufigsteStimmung}. Reflektiere, wie sie deine Ergebnisse beeinflusst.`,
    );
  }
  if (sumPnl < 0)
    tips.push("Überdenke deine Strategie – das Gesamtergebnis ist negativ.");
  if (sumPnl > 0)
    tips.push("Weiter so! Deine Strategie scheint zu funktionieren.");
  return { patterns, tips, moodStats, fehlerStats };
}

// Express-Handler
export async function analyseTradesHandler(req, res, pool, logger) {
  try {
    const result = await pool.query(
      "SELECT * FROM trades WHERE user_id = $1 ORDER BY date ASC",
      [req.user.userId],
    );
    const trades = result.rows;
    const analysis = analyseTrades(trades);
    res.json(analysis);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Analyse fehlgeschlagen" });
  }
}
