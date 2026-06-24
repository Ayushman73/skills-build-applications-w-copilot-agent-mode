import { Schema, model, Types } from "mongoose";

const workoutSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ["beginner", "intermediate", "advanced"] },
  durationMinutes: { type: Number, required: true },
  completedAt: { type: Date, default: () => new Date() },
});

export interface WorkoutDocument {
  user: Types.ObjectId;
  title: string;
  difficulty: string;
  durationMinutes: number;
  completedAt: Date;
}

export default model<WorkoutDocument>("Workout", workoutSchema);
