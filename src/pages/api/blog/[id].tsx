import { GetServerSideProps } from "next";
import { connectDB } from '../../../lib/mongoDB';
import Blog from "@/models/Blog";
import User from "@/models/User";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectDB();
    const user = await User.findById(context.query.id);
    if (!user) {
        console.log("User not found");
    }
    const { id } = context.params!;
    try {
        const blog = await Blog.findById(id).populate("author","firstName lastName").lean();
        if (!blog) {
            return { notFound: true };
        }

        return {
            props: { blog: JSON.parse(JSON.stringify(blog)) },
        };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return { notFound: true };
    }
}