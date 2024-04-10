import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { allNews } from "@/utils/model/newData";

export default async function handler(req, res) {
  await mongoose.connect(connectionStr);
  if (req.method === "GET") {
    const finalQuery = {
      language: "",
      category: [],
    };
    finalQuery.category = [req?.query?.category];
    finalQuery.language = req?.query?.language === "hi" ? "hindi" : "english";
    const isNewsExist = await allNews.find(finalQuery).limit(10);
    res.status(200).json(isNewsExist);
  } else if (req.method === "POST") {
    try {
      const reqBody = req?.body;
      if (reqBody.length > 0) {
        reqBody.forEach(async (item) => {
          const { article_id } = item;
          const isNewsExist = await allNews.findOne({ article_id });
          if (!isNewsExist) {
            const newNews = new allNews(item);
            const savedNews = await newNews.save();
            res.status(201).json(savedNews);
          } else {
            res.status(201).json({ messaging: "Already Exist" });
          }
        });
      } else {
        res.status(200).json({ Message: "There is no Data" });
      }
    } catch (error) {
      res.status(200).json(error);
    }
  }
}
