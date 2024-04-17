import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { apiCallTimes } from "@/utils/model/apiCallTime";

export default async function handler(req, res) {
  await mongoose.connect(connectionStr);
  const date = new Date();
  if (req.method === "GET") {
    const finalQuery = {
      language: "",
      category: "",
    };
    finalQuery.category = req?.query?.category;
    finalQuery.language = req?.query?.language === "hi" ? "hindi" : "english";
    const isNewsExist = await apiCallTimes.findOne(finalQuery);
    res.status(200).json({
      success: true,
      message: "GET Method Call",
      timestamp: isNewsExist ? isNewsExist?.timestamp : null,
    });
  } else if (req.method === "POST") {
    const reqBody = req.body;
    const finalQuery = {
      language: "",
      category: "",
    };
    finalQuery.category = reqBody?.category ? reqBody?.category : "top";
    finalQuery.language = reqBody?.lang === "hi" ? "hindi" : "english";
    const newTimestamp = Date.now();

    const updateTime = await apiCallTimes.findOneAndUpdate(
      finalQuery,
      {
        $set: { timestamp: newTimestamp },
      },
      { new: true, upsert: true }
    );

    if (!updateTime) {
      await apiCallTimes.insertOne({ ...finalQuery, timestamp: newTimestamp });
    }

    res.status(200).json({
      success: true,
      message: "POST Method Call",
      updateTime,
    });
  }
}
