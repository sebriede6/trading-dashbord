import express from 'express';
import { login, register } from '../controllers/auth.js';

export default (pool, logger) => {
  const router = express.Router();
  router.post('/register', (req, res) => register(req, res, pool, logger));
  router.post('/login', (req, res) => login(req, res, pool, logger));
  return router;
};
