import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

if (!process.env.DB_URL) {
    throw new Error("⚠️ MongoDB URI is not defined in environment variables.");
};

export async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.DB_URL as string, { dbName: "mushroomdb" });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}