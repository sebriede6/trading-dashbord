export async function updateTodo(req, res, pool, logger) {
  const { id } = req.params;
  const { text, priority } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing todo text' });
  try {
    const result = await pool.query(
      'UPDATE todos SET text = $1, priority = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [text, priority ?? 2, id, req.user.userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
}
export async function getTodos(req, res, pool, logger) {
  try {
    const result = await pool.query('SELECT * FROM todos WHERE user_id = $1', [req.user.userId]);
    res.json(result.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
}

export async function addTodo(req, res, pool, logger) {
  const { text, priority } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing todo text' });
  try {
    const result = await pool.query(
      'INSERT INTO todos (user_id, text, priority) VALUES ($1, $2, $3) RETURNING *',
      [req.user.userId, text, priority ?? 2]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
}

export async function deleteTodo(req, res, pool, logger) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2', [id, req.user.userId]);
    res.status(204).end();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}
