import express from "express";
import { apiUrl, port } from "./config.ts";
import { connectDatabase } from "./config/database.ts";
import usersRouter from "./routes/users.ts";
import teamsRouter from "./routes/teams.ts";
import activitiesRouter from "./routes/activities.ts";
import leaderboardRouter from "./routes/leaderboard.ts";
import workoutsRouter from "./routes/workouts.ts";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "octofit-backend",
    apiUrl,
  });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on ${apiUrl}`);
});

connectDatabase()
  .then(() => {
    console.log("Connected to MongoDB:", process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
