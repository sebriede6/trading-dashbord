import express from "express";
import {
  getProfile,
  updatePsychology,
} from "../controllers/profileController.js";
import { authenticate } from "../controllers/auth.js";

export default function (pool, logger) {
  const router = express.Router();
  // JWT-geschützt
  router.get("/", authenticate, (req, res) => {
    logger && logger.info("[ProfileRoute] /api/profile aufgerufen");
    getProfile(req, res, pool, logger);
  });

  router.put("/psychology", authenticate, (req, res) => {
    logger &&
      logger.info("[ProfileRoute] /api/profile/psychology aktualisieren");
    updatePsychology(req, res, pool, logger);
  });
  return router;
}
