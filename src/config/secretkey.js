import dotenv from 'dotenv';

dotenv.config();

const config = {
  secretKey: process.env.JWT_SECRET_KEY, // Generate a random secret key
};

export default config;