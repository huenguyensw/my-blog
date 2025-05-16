import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB"; // MongoDB connection function
import User from "@/models/User"; // Blog model
const bcrypt = require('bcrypt');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Destructure the required fields from the request body
      const { firstName, lastName, email, imageUrl, userName, password } = req.body;

      // Check if the required fields are present
      // Add your logic to process the data
      if (!firstName || !lastName || !email || !imageUrl || !userName || !password) {
        return res.status(400).json({ message: 'Obligatoriska fält saknas' });
      }

      // Connect to the database
      await connectDB();

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'E-postadressen är redan registrerad' });
      }
      // Check if a user with the same username already exists  
      const existingUserName = await User.findOne({ userName });
      if (existingUserName) {
        return res.status(409).json({ message: 'Användarnamnet är redan taget' });
      }
      const saltRounds = 10; // You can adjust the number of rounds for security
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the user's password with the salt
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user record
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        userName: req.body.userName,
        password: hashedPassword,
        favorites: [],
      });

      // Save the mushroom record to the database
      await newUser.save();

      // Return a success response
      res.status(201).json({ message: "Registreringen lyckades!", user: newUser });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ message: "Internt serverfel", error: error });
    }
  } else {
    // Handle other HTTP methods (for example, GET) if necessary
    res.status(405).json({ message: 'Metod ej tillåten' });
  }
}

