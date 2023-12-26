import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { User } from "@/utils/model/user";
export default async function handler(req, res) {
  await mongoose.connect(connectionStr);
  if (req.method === "POST") {
    const reqBody = req?.body;
    const { email } = reqBody;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.status(200).json({ userExist: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
