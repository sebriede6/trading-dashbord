export async function getTrades(req, res, pool, logger) {
  try {
    const result = await pool.query('SELECT * FROM trades WHERE user_id = $1 ORDER BY date DESC, id DESC', [req.user.userId]);
    res.json(result.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
}

export async function addTrade(req, res, pool, logger) {
  const { date, symbol, type, pnl, gewinn, verlust, note, mood, fehler_tags, reflexion } = req.body;
  if (!date || !symbol || !type) {
    return res.status(400).json({ error: 'Missing trade data' });
  }
  // Logging für Debug
  logger.info('addTrade req.body:', req.body);
  function toNull(val) {
    if (val === undefined || val === null) return null;
    if (typeof val === 'string' && val.trim() === '') return null;
    return val;
  }
  try {
    const result = await pool.query(
      'INSERT INTO trades (user_id, date, symbol, type, pnl, gewinn, verlust, note, mood, fehler_tags, reflexion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [
        req.user.userId,
        date,
        symbol,
        type,
        pnl || null,
        gewinn || null,
        verlust || null,
        toNull(note),
        toNull(mood),
        toNull(fehler_tags),
        toNull(reflexion)
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to add trade' });
  }
}

export async function deleteTrade(req, res, pool, logger) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM trades WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    res.json({ success: true });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete trade' });
  }
}
