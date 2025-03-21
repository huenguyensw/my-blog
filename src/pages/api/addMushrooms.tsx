import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import Mushroom from "@/models/Mushroom";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !=="POST"){
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try{
    await connectDB();
    const { name, description, location, uses, imageUrl } = req.body;
    if (!name || !description || !location || !uses || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMushroom = new Mushroom({ name, description, location, uses, imageUrl });
    await newMushroom.save();

    res.status(201).json({ message: "Mushroom added successfully", mushroom: newMushroom });

  }catch(error){
    res.status(500).json({ message: "Server error", error });
  }
}