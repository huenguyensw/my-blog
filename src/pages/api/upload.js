// import multer from "multer";

// // Multer storage config (store files in "public/uploads")
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: "./public/uploads",
//         filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
//     })
// })

// // Middleware wrapper to handle file uploads
// const runMiddleware = (req, res, fn) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });
// };

// // Disable body parsing for file uploads
// export const config = { api: { bodyParser: false } };




// // API Handler
// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

//   await runMiddleware(req, res, upload.single("file")); // Process file upload

//   try {
//     const reqWithFile = req; // 🔹 Type assertion

//     if (!reqWithFile.file) return res.status(400).json({ error: "No file uploaded" });
//     const imageUrl = `/uploads/${reqWithFile.file.filename}`; // Construct relative image URL
    
//     return res.status(201).json({ message: "Image uploaded successfully!", imageUrl });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ error: "Error saving data" });
//   }
// }


import multer from "multer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebaseConfig"; // Adjust the import path as necessary

const upload = multer({
  storage: multer.memoryStorage(), // 🔄 Use memory storage instead of disk
});

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await runMiddleware(req, res, upload.single("file"));

  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const filename = `${Date.now()}-${file.originalname}`;
    const fileRef = ref(storage, `uploads/${filename}`);
    await uploadBytes(fileRef, file.buffer);

    const downloadURL = await getDownloadURL(fileRef);

    return res.status(201).json({
      message: "File uploaded successfully",
      imageUrl: downloadURL,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
}


