
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import winston from 'winston';
import { Pool } from 'pg';
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';
import tradeRoutes from './routes/trade.js';
import startkapitalRoutes from './routes/startkapital.js';

const app = express();
const env = typeof globalThis.process !== 'undefined' && globalThis.process.env ? globalThis.process.env : {};
const port = env.PORT || 3000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [new winston.transports.Console()]
});
// Logge alle HTTP-Requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes(pool, logger));
app.use('/api/todos', todoRoutes(pool, logger));
app.use('/api/trades', tradeRoutes(pool, logger));
app.use('/api/startkapital', startkapitalRoutes(pool, logger));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use((err, req, res) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => logger.info(`Server running on port ${port} (${new Date().toLocaleString()})`));
