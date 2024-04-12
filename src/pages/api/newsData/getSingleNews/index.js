import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { allNews } from "@/utils/model/newData";

export default async function handler(req, res) {
  await mongoose.connect(connectionStr);
  if (req.method === "GET") {
    const article_id = req?.query?.article_id;
    const isNewsExist = await allNews.findOne({ article_id });
    if (isNewsExist) {
      res.status(200).json(isNewsExist);
    } else {
      res.status(200).json({ error: "can not find this id" });
    }
  }
}
