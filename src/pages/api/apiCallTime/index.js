import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
export default async function handler(req, res) {
  await mongoose.connect(connectionStr);
  if (req.method === "GET") {
    console.log("GET Method Call");
  } else if (req.method === "GET") {
    console.log("POST Method Call");
  }
}
