import { Router } from "express";
import Activity from "../models/activity.ts";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const activities = await Activity.find().lean();
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: "Failed to load activities" });
  }
});

router.post("/", async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: "Activity logged", activity });
  } catch (error) {
    res.status(400).json({ error: "Activity creation failed", details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
