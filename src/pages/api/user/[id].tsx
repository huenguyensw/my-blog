import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/User";
import bcrypt from 'bcrypt';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import type { File } from "formidable";

// Disable default body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Metod ej tillåten" });
    }


    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Form parsing error:", err);
            return res.status(500).json({ message: "Formulärfel", error: err });
        }
        try {
            await connectDB();
            // Extract fields and handle arrays
            const firstName = Array.isArray(fields.firstName) ? fields.firstName[0] : fields.firstName;
            const lastName = Array.isArray(fields.lastName) ? fields.lastName[0] : fields.lastName;
            const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
            const userName = Array.isArray(fields.userName) ? fields.userName[0] : fields.userName;
            const password = Array.isArray(fields.password) ? fields.password[0] : fields.password;

            if (!firstName || !lastName || !email || !userName || !password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const user = await User.findById(req.query.id);
            if (!user) {
                return res.status(404).json({ message: "Användare hittades inte" });
            }
            // Update image if provided

            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }

            // Now safely hash the password as a string
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            // Optional: handle file upload and get file path
            let uploadedImageUrl = user.imageUrl; // Default to existing image URL

            // If file uploaded (e.g., files.imageUrl exists)
            if (files.imageUrl && files.imageUrl[0]) {
                const file = files.imageUrl[0];
                const data = fs.readFileSync(file.filepath);
                const fileName = `uploads/${Date.now()}-${file.originalFilename}`;
                fs.writeFileSync(`./public/${fileName}`, data);
                uploadedImageUrl = '/' + fileName;
            }
            console.log("Uploaded image URL:", files.imageUrl);
            const updatedUser = await User.findByIdAndUpdate(
                req.query.id,
                {
                    firstName,
                    lastName,
                    email,
                    userName,
                    password: hashedPassword,
                    imageUrl: uploadedImageUrl,
                },
                { new: true }
            );

            res.status(200).json(updatedUser);

        } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Internt serverfel", error });
    }
});
}
