import { Schema, model, Types } from "mongoose";

const teamSchema = new Schema({
  name: { type: String, required: true },
  captain: { type: Types.ObjectId, ref: "User", required: true },
  members: [{ type: Types.ObjectId, ref: "User", required: true }],
  createdAt: { type: Date, default: () => new Date() },
});

export interface TeamDocument {
  name: string;
  captain: Types.ObjectId;
  members: Types.ObjectId[];
  createdAt: Date;
}

export default model<TeamDocument>("Team", teamSchema);
