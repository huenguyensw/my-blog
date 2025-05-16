// Mongoose schema for mushrooms
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String, required: true }, 
    userName: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: true },
    favorites: { type: [String], default: [] },
})

const User = models.User || model("User", UserSchema);
export default User;