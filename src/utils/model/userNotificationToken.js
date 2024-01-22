import mongoose from "mongoose";

const tokenModal = mongoose.Schema(
  {
    token: String,
  },
  {
    timestamps: true,
  }
);
export const notificationToken =
  mongoose.models.notificationTokens ||
  mongoose.model("notificationTokens", tokenModal);
