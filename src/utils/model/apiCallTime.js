import mongoose from "mongoose";

const apiCallTime = mongoose.Schema(
  {
    language: String,
    category: String,
    timestamp: Number,
  },
  {
    timestamps: true,
  }
);
export const apiCallTimes =
  mongoose.models.apiCallTimes || mongoose.model("apiCallTimes", apiCallTime);
