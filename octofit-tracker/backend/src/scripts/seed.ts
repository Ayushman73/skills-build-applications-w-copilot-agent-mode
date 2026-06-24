import mongoose from "mongoose";
import { mongoUri } from "../config.ts";
import Activity from "../models/activity.ts";
import Leaderboard from "../models/leaderboard.ts";
import Team from "../models/team.ts";
import User from "../models/user.ts";
import Workout from "../models/workout.ts";

/**
 * Seed the octofit_db database with test data.
 */
async function main() {
  console.log("Seed the octofit_db database with test data...");

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB for seeding:", mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: "Ari Taylor", email: "ari@octofit.dev", role: "user" },
    { name: "Jordan Lee", email: "jordan@octofit.dev", role: "coach" },
    { name: "Sam Patel", email: "sam@octofit.dev", role: "user" },
  ]);

  const teams = await Team.create([
    { name: "Velocity Vipers", captain: users[1]._id, members: [users[0]._id, users[1]._id] },
    { name: "Summit Striders", captain: users[2]._id, members: [users[2]._id] },
  ]);

  const activities = await Activity.create([
    { user: users[0]._id, type: "running", durationMinutes: 32, caloriesBurned: 340, performedAt: new Date(Date.now() - 1000 * 60 * 60 * 3) },
    { user: users[2]._id, type: "cycling", durationMinutes: 45, caloriesBurned: 520, performedAt: new Date(Date.now() - 1000 * 60 * 60 * 6) },
    { user: users[0]._id, type: "strength training", durationMinutes: 58, caloriesBurned: 620, performedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  ]);

  const leaderboard = await Leaderboard.create([
    { user: users[0]._id, score: 1840, rank: 1 },
    { user: users[2]._id, score: 1590, rank: 2 },
    { user: users[1]._id, score: 1410, rank: 3 },
  ]);

  const workouts = await Workout.create([
    { user: users[0]._id, title: "Morning HIIT", difficulty: "intermediate", durationMinutes: 28, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { user: users[2]._id, title: "Recovery Yoga", difficulty: "beginner", durationMinutes: 40, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { user: users[1]._id, title: "Endurance Ladder", difficulty: "advanced", durationMinutes: 55, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 20) },
  ]);

  console.log("Seed data created:");
  console.log({ users: users.length, teams: teams.length, activities: activities.length, leaderboard: leaderboard.length, workouts: workouts.length });

  await mongoose.disconnect();
  console.log("MongoDB disconnected after seeding.");
}

main().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
