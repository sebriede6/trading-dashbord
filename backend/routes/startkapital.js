import express from 'express';
import { authenticate } from '../controllers/auth.js';

export default function(pool, logger) {
  const router = express.Router();
  router.use(authenticate);

  // Get startkapital for current user
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT startkapital FROM users WHERE id = $1', [req.user.userId]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ startkapital: result.rows[0].startkapital });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: 'Failed to fetch startkapital' });
    }
  });

  // Set startkapital for current user
  router.post('/', async (req, res) => {
    const { startkapital } = req.body;
    if (startkapital === undefined) return res.status(400).json({ error: 'Missing startkapital' });
    try {
      await pool.query('UPDATE users SET startkapital = $1 WHERE id = $2', [startkapital, req.user.userId]);
      res.json({ success: true });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: 'Failed to update startkapital' });
    }
  });

  return router;
}
