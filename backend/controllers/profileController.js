// Gibt alle Profilinfos und Stats zurück
export async function getProfile(req, res, pool, logger) {
  try {
    const userId = req.user.userId;
    logger && logger.info(`[Profile] userId aus Token: ${userId}`);
    // Userdaten
    const userRes = await pool.query(
      "SELECT id, username, email, avatar_url, github_name FROM users WHERE id = $1",
      [userId],
    );
    logger &&
      logger.info(`[Profile] DB-Resultat für userId ${userId}:`, userRes.rows);
    const user = userRes.rows[0] || {};
    // Fallbacks für fehlende Felder
    user.avatar_url = user.avatar_url || "";
    user.username = user.username || "";
    user.email = user.email || "";
    user.github_name = user.github_name || "";
    // Statistiken
    const tradesRes = await pool.query(
      `
      SELECT
        COUNT(*) AS trades,
        SUM(pnl) AS sum_pnl,
        SUM(gewinn) AS sum_gewinn,
        SUM(verlust) AS sum_verlust
      FROM trades
      WHERE user_id = $1
    `,
      [userId],
    );
    const todosRes = await pool.query(
      "SELECT COUNT(*) AS todos FROM todos WHERE user_id = $1",
      [userId],
    );
    const goalsRes = await pool.query(
      "SELECT COUNT(*) AS goals FROM goals WHERE user_id = $1",
      [userId],
    );
    // Psychologie
    const psychRes = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const psychology = psychRes.rows[0] || {};
    // Zusammenstellen
    const tradeRow = tradesRes.rows[0] || {};
    const rawSumPnl = tradeRow.sum_pnl;
    const sumGewinn =
      tradeRow.sum_gewinn != null ? Number(tradeRow.sum_gewinn) : 0;
    const sumVerlust =
      tradeRow.sum_verlust != null ? Number(tradeRow.sum_verlust) : 0;
    const derivedPnl =
      rawSumPnl != null && Number.isFinite(Number(rawSumPnl))
        ? Number(rawSumPnl)
        : sumGewinn - sumVerlust;

    res.json({
      user,
      stats: {
        trades: Number(tradeRow.trades || 0),
        pnl: Number.isFinite(derivedPnl) ? derivedPnl : 0,
        todos: Number(todosRes.rows[0]?.todos || 0),
        goals: Number(goalsRes.rows[0]?.goals || 0),
      },
      psychology,
    });
  } catch (err) {
    logger && logger.error("Fehler beim Laden des Profils", err);
    res.status(500).json({ error: "Profil konnte nicht geladen werden." });
  }
}

export async function updatePsychology(req, res, pool, logger) {
  try {
    const userId = req.user.userId;
    const allowedFields = [
      "motivation",
      "discipline",
      "stress",
      "focus",
      "emotion",
      "confidence",
    ];

    const sanitized = {};
    let invalidField = null;

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        const raw = req.body[field];
        if (raw === null || raw === "" || typeof raw === "undefined") {
          sanitized[field] = null;
        } else {
          const numeric = Number(raw);
          if (!Number.isFinite(numeric)) {
            invalidField = field;
            return;
          }
          const clamped = Math.min(Math.max(numeric, 0), 10);
          sanitized[field] = Math.round(clamped * 10) / 10;
        }
      }
    });

    if (invalidField) {
      return res
        .status(400)
        .json({ error: `Ungültiger Wert für ${invalidField}.` });
    }

    const fields = Object.keys(sanitized);
    if (!fields.length) {
      return res
        .status(400)
        .json({ error: "Keine gültigen Felder übermittelt." });
    }

    const values = fields.map((field) => sanitized[field]);
    values.push(userId);

    const assignments = fields.map(
      (field, index) => `${field} = $${index + 1}`,
    );
    const updateQuery = `UPDATE users SET ${assignments.join(", ")} WHERE id = $${
      fields.length + 1
    } RETURNING motivation, discipline, stress, focus, emotion, confidence`;
    const result = await pool.query(updateQuery, values);
    const psychology = result.rows[0] || {};
    logger &&
      logger.info(`[Profile] Psychologie aktualisiert für userId ${userId}`);
    res.json({ psychology });
  } catch (err) {
    logger && logger.error("Fehler beim Aktualisieren der Psychologie", err);
    res
      .status(500)
      .json({ error: "Psychologie konnte nicht gespeichert werden." });
  }
}
