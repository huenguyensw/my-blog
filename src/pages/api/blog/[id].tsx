import { GetServerSideProps } from "next";
import { connectDB } from '../../../lib/mongoDB';
import Blog from "@/models/Blog";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectDB();

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