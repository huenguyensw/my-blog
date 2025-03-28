// Function to fetch mushroom data

import { GetServerSideProps } from "next";
import {connectDB} from '../../lib/mongoDB';
import Blog from "@/models/Blog";

export const getServerSideProps: GetServerSideProps = async() => {
    await connectDB();
    const blogs = await Blog.find().lean();

    return {
        props: {blogs: JSON.parse(JSON.stringify(blogs))}
    }
}