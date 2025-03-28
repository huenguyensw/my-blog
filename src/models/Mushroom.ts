// Mongoose schema for mushrooms
import mongoose from "mongoose";

const MushroomSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    imageUrl: String,
    uses: String, //Example: ["Cooking", "Medicine"]
    rating: Number,
})

export default mongoose.models.Mushroom || mongoose.model("Mushroom", MushroomSchema);