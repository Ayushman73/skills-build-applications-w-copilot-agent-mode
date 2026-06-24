import { Router } from "express";
import Leaderboard from "../models/leaderboard.ts";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10).lean();
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

router.post("/", async (req, res) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json({ entry });
  } catch (error) {
    res.status(400).json({ error: "Leaderboard entry creation failed", details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
