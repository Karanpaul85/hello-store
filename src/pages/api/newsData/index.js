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
    const page = Number(req?.query?.page);
    const limit = Number(req?.query?.limit);
    const skip = (page - 1) * limit;

    finalQuery.category = [req?.query?.category];
    finalQuery.language = req?.query?.language === "hi" ? "hindi" : "english";
    const isNewsExist = await allNews
      .find(finalQuery)
      .skip(skip)
      .sort({ _id: -1 })
      .limit(limit);
    res.status(200).json(isNewsExist);
  } else if (req.method === "POST") {
    try {
      const reqBody = req?.body;
      if (reqBody.length > 0) {
        let allSaved = true;
        reqBody.forEach(async (item, index) => {
          const { article_id } = item;
          const isNewsExist = await allNews.findOne({ article_id });
          if (!isNewsExist) {
            const newNews = new allNews(item);
            await newNews.save();
          }
          if (index === reqBody.length - 1) {
            if (allSaved) {
              res.status(201).json({ messaging: "All news are saved" });
            } else {
              res
                .status(200)
                .json({ messaging: "Some news were already saved" });
            }
          }
        });
      } else {
        res
          .status(200)
          .json({ Message: "There is no Data in request to save" });
      }
    } catch (error) {
      res.status(200).json(error);
    }
  }
}
