// Mongoose schema for mushrooms
import mongoose,  {  model, models } from "mongoose";

const BlogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, // it can be some text about the blog, or a short description of the mushroom
    category: {type: [String], required: true}, //mat
    imageUrl: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: {type: Date},
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    ingredients: {type: [String], required: true}, //Ingredients, apply for food blogs
    preparationTime: {type: Number}, // appy for food blogs
    cookingTime: Number, // appy for food blogs
    cookingSteps: {type: [String]}, // apply for food blogs
    preservationMethods: {type:[String]}, // reports related to methods in order to preservate mushrooms.
    recognization: {type: [String]}, // apply for all blogs
    relatedPosts: {type: [String]} // apply for all blogs
})

const Blog = models.Blog || model('Blog', BlogSchema);
export default Blog;