// Alle Ziele für den eingeloggten User holen
export async function getGoals(req, res, pool, logger) {
  try {
    // Debug-Logging für Authentifizierung
    if (!req.user || !req.user.userId) {
      logger &&
        logger.warn("Kein req.user oder userId im Request!", {
          user: req.user,
        });
      return res
        .status(401)
        .json({ error: "Nicht eingeloggt oder Token ungültig." });
    }
    const userId = req.user.userId;
    const result = await pool.query(
      "SELECT * FROM goals WHERE user_id = $1 ORDER BY id",
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    logger && logger.error("Fehler beim Laden der Ziele", err);
    res.status(500).json({ error: "Fehler beim Laden der Ziele." });
  }
}

// Ziel hinzufügen
export async function addGoal(req, res, pool, logger) {
  try {
    const userId = req.user.userId;
    const { text, target, unit } = req.body;
    const result = await pool.query(
      "INSERT INTO goals (user_id, text, target, unit) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, text, target, unit],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger && logger.error("Fehler beim Hinzufügen des Ziels", err);
    res.status(500).json({ error: "Fehler beim Hinzufügen des Ziels." });
  }
}

// Ziel löschen
export async function deleteGoal(req, res, pool, logger) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    await pool.query("DELETE FROM goals WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);
    res.json({ success: true });
  } catch (err) {
    logger && logger.error("Fehler beim Löschen des Ziels", err);
    res.status(500).json({ error: "Fehler beim Löschen des Ziels." });
  }
}

// Ziel aktualisieren (optional)
export async function updateGoal(req, res, pool, logger) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { text, target, unit } = req.body;
    const result = await pool.query(
      "UPDATE goals SET text = $1, target = $2, unit = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [text, target, unit, id, userId],
    );
    res.json(result.rows[0]);
  } catch (err) {
    logger && logger.error("Fehler beim Aktualisieren des Ziels", err);
    res.status(500).json({ error: "Fehler beim Aktualisieren des Ziels." });
  }
}
