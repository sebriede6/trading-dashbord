import express from "express";
import { analyseTradesHandler } from "../controllers/kiAnalyse.js";
import { authenticate } from "../controllers/auth.js";

export default function (pool, logger) {
  const router = express.Router();
  router.use(authenticate);
  router.get("/analyse", (req, res) =>
    analyseTradesHandler(req, res, pool, logger),
  );
  return router;
}
