import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+@.+\..+/
    },
    passwordHash: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export const User = model("User", userSchema);