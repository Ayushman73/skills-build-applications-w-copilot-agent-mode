import express from "express";
import { apiUrl } from "./config.ts";
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

export default app;
