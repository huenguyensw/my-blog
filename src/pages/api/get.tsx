// Function to fetch mushroom data

import { GetServerSideProps } from "next";
import {connectDB} from '../../lib/mongoDB';
import User from "@/models/User";
import Blog from "@/models/Blog";

export const getServerSideProps: GetServerSideProps = async() => {
    await connectDB();
    const users = await User.find().lean();
    const blogs = await Blog.find().populate("author", "firstName lastName imageUrl").lean();
    // ✅ Log the blogs to the server console
    console.log("Blogs:", blogs);
    // ✅ Log the users to the server console
    console.log("Users:", users);

    return {
        props: {blogs: JSON.parse(JSON.stringify(blogs))}
    }
}