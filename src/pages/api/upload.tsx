import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";

// Multer storage config (store files in "public/uploads")
const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
})

// Middleware wrapper to handle file uploads
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

// Disable body parsing for file uploads
export const config = { api: { bodyParser: false } };

// **Override request type to include Multer file**
interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}


// API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await runMiddleware(req, res, upload.single("file")); // Process file upload

  try {
    const reqWithFile = req as MulterRequest; // 🔹 Type assertion

    if (!reqWithFile.file) return res.status(400).json({ error: "No file uploaded" });
    const imageUrl = `/uploads/${reqWithFile.file.filename}`; // Construct relative image URL
    
    return res.status(201).json({ message: "Image uploaded successfully!", imageUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Error saving data" });
  }
}




