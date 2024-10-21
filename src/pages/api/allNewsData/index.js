import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { allNews } from "@/utils/model/newData";
export default async function handler(req, res) {
  await mongoose.connect(connectionStr);
  if (req.method === "GET") {
    const allnewsDataArray = await allNews.find();
    const finalData = [];
    allnewsDataArray.map((item) => {
      const singleObj = {};
      singleObj.article_id = item.article_id;
      singleObj.language = item.language;
      singleObj.category = item.category;
      singleObj.updatedAt = item.updatedAt;
      finalData.push(singleObj);
    });
    res.status(200).json(finalData);
  }
}
