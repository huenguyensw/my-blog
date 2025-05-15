

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB"; // MongoDB connection function
import Blog from "@/models/Blog"; // Blog model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Destructure the required fields from the request body
      const { name, description, category, imageUrl, rating, author} = req.body;

      // Check if the required fields are present
      // Add your logic to process the data
      if (!name || !description || !category || !imageUrl || !rating || !author) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      console.log("Request body:", req.body);

      // Connect to the database
      await connectDB();

      // Create a new mushroom record
      const newBlog = new Blog({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,  // Make sure you include the category field
        imageUrl: req.body.imageUrl,
        rating: req.body.rating,
        createdAt: new Date(),
        updatedAt: new Date(),
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        preservationMethods: req.body.preservationMethods,  
        relatedPosts: req.body.relatedPosts,
        ingredients: req.body.ingredients,  
        author: req.body.author, // Assuming you have an author field
        cookingSteps: req.body.cookingSteps, // Assuming you have a cookingSteps field
        recognization: req.body.recognization // Assuming you have a recognization field
      });

      // Save the mushroom record to the database
      await newBlog.save();

      // Return a success response
      res.status(201).json({ message: "Blog added successfully!", blog: newBlog });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ message: "Internal server error", error: error });
    }
  } else {
    // Handle other HTTP methods (for example, GET) if necessary
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
