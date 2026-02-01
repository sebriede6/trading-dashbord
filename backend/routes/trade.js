import express from "express";
import {
  getTrades,
  addTrade,
  deleteTrade,
  getTradeStats,
} from "../controllers/trade.js";
import { authenticate } from "../controllers/auth.js";

export default function (pool, logger) {
  const router = express.Router();
  router.use(authenticate);
  router.get("/", (req, res) => getTrades(req, res, pool, logger));
  router.get("/stats", (req, res) => getTradeStats(req, res, pool, logger));
  router.post("/", (req, res) => addTrade(req, res, pool, logger));
  router.delete("/:id", (req, res) => deleteTrade(req, res, pool, logger));
  return router;
}
