import { Schema, model, Types } from "mongoose";

const activitySchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  performedAt: { type: Date, default: () => new Date() },
});

export interface ActivityDocument {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

export default model<ActivityDocument>("Activity", activitySchema);
