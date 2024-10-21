import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { User } from "@/utils/model/user";
export default async function handler(req, res) {
  await mongoose.connect(connectionStr);
  if (req.method === "GET") {
    const { email } = req?.query;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.status(200).json(false);
      } else {
        res.status(200).json(existingUser);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    const { email, newPassword, confirmPassword } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.status(200).json(false);
      } else {
        res.status(200).json(existingUser);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const reqBody = req?.body;
    const { email } = reqBody;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.status(200).json(false);
      } else {
        res.status(200).json(existingUser);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
