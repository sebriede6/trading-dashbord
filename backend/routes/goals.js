import express from "express";
import {
  getGoals,
  addGoal,
  deleteGoal,
  updateGoal,
} from "../controllers/goals.js";
import { authenticate } from "../controllers/auth.js";

export default function (pool, logger) {
  const router = express.Router();
  router.use(authenticate);
  router.get("/", (req, res) => getGoals(req, res, pool, logger));
  router.post("/", (req, res) => addGoal(req, res, pool, logger));
  router.delete("/:id", (req, res) => deleteGoal(req, res, pool, logger));
  router.put("/:id", (req, res) => updateGoal(req, res, pool, logger));
  return router;
}
