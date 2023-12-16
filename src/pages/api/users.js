import { connectionStr } from "@/utils/db";
import { User } from "@/utils/model/user";
import mongoose from "mongoose";

export default async function handler(req, res) {
  // Connect to the MongoDB database
  await mongoose.connect(connectionStr);

  if (req.method === "GET") {
    // Handle GET request to fetch data
    const data = await User.find();
    res.status(200).json(data);
  } else if (req.method === "POST") {
    // Handle POST request to add new data
    const { email, name, picture, given_name, family_name, password } =
      req.body;

    // Validate request body
    if (!email) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(409).json(existingUser);
        return;
      }

      // Create a new user instance
      const newUser = new User({
        email,
        name,
        picture,
        given_name,
        family_name,
        password,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
