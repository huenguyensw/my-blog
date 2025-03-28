// Mongoose schema for mushrooms
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: [String],
    imageUrl: String,
    rating: { type: Number, min: 0, max: 5 },
})

export default mongoose.models.Mushroom || mongoose.model("Mushroom", BlogSchema);