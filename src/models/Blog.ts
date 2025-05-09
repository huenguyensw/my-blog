// Mongoose schema for mushrooms
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {type: [String], required: true}, //mat
    imageUrl: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: {type: Date},
    author: {type: String}, 
    ingredients: {type: [String], required: true}, //Ingredients, apply for food blogs
    preparationTime: {type: Number}, // appy for food blogs
    cookingTime: Number, // appy for food blogs
    preservationMethods: {type:[String]}, // reports related to methods in order to preservate mushrooms.
    relatedPosts: {type: [String]} // apply for all blogs
})

export default mongoose.models.Mushroom || mongoose.model("Mushroom", BlogSchema);