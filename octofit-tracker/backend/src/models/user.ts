import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["user", "coach", "admin"], default: "user" },
  joinedAt: { type: Date, default: () => new Date() },
});

export interface UserDocument {
  name: string;
  email: string;
  role: string;
  joinedAt: Date;
}

export default model<UserDocument>("User", userSchema);
