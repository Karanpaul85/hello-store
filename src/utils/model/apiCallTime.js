import mongoose, { Mongoose } from "mongoose";

const apiCallTime = mongoose.Schema(
  {
    queryType: Array,
  },
  {
    timestamps: true,
  }
);
export const apiCallTimes =
  mongoose.models.apiCallTimes || mongoose.model("apiCallTimes", newsModal);
