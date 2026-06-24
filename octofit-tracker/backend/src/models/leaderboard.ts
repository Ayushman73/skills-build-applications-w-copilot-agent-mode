import { Schema, model, Types } from "mongoose";

const leaderboardSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

export interface LeaderboardDocument {
  user: Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

export default model<LeaderboardDocument>("Leaderboard", leaderboardSchema);
