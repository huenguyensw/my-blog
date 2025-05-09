import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB"; // MongoDB connection function
import User from "@/models/User"; // Blog model
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
const config = require('../../config/secretkey'); 
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Destructure the required fields from the request body
      const {  email, password } = req.body;

      // Check if the required fields are present
      // Add your logic to process the data
      if ( !email || !password) {
        return res.status(400).json({ message: 'Obligatoriska fält saknas' });
      }

      // Connect to the database
      await connectDB();

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(409).json({ message: 'Ogiltiga inloggningsuppgifter' });
      }
      
    // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        console.log("isPasswordValid", isPasswordValid, password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Ogiltigt lösenord' });
        }
    // Generate a JWT token upon successful login
        const token = jwt.sign({ id: existingUser._id }, config.secretKey, { expiresIn: '1h' });  
        
        // Return a success response
        const sessionId = uuidv4(); // Generate a unique session ID
        // res.setHeader('Set-Cookie', [
        //   `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
        //   `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=3600`
        // ]);
        res.status(200).json({ message: "Inloggningen lyckades!", sessionId: sessionId, accessToken: token, user: existingUser });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ message: "Internt serverfel", error: error });
    }
  } else {
    // Handle other HTTP methods (for example, GET) if necessary
    res.status(405).json({ message: 'Metod ej tillåten' });
  }
}

