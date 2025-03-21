// Function to fetch mushroom data

import { GetServerSideProps } from "next";
import {connectDB} from '../../lib/mongoDB';
import Mushroom from "@/models/Mushroom";

export const getServerSideProps: GetServerSideProps = async() => {
    await connectDB();
    const mushrooms = await Mushroom.find().lean();

    return {
        props: {mushrooms: JSON.parse(JSON.stringify(mushrooms))}
    }
}