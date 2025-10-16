import multer from "multer";
import path from "path";
import fs from "fs";

// Define directories for images and videos
const imageDir = path.join(__dirname, "../../../../uploads/images");
const videoDir = path.join(__dirname, "../../../../uploads/videos");

// 🔥 Function to ensure a directory exists or create it
const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created folder: ${dir}`);
  }
};

// Call it for both folders at startup
ensureDirExists(imageDir);
ensureDirExists(videoDir);

// Set storage engine
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Decide folder based on file type
    let targetDir: string;
    if ([".mp4", ".mov", ".avi", ".mkv"].includes(ext)) {
      targetDir = videoDir; // For videos
    } else {
      targetDir = imageDir; // For images
    }

    // Ensure the folder exists before saving
    ensureDirExists(targetDir);

    cb(null, targetDir);
  },

  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter
// const fileFilter = (
//   _req: Express.Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   const allowedTypes = [
//     ".png",
//     ".jpg",
//     ".jpeg",
//     ".pdf",
//     ".mp4",
//     ".mov",
//     ".avi",
//     ".mkv",
//   ];
//   const ext = path.extname(file.originalname).toLowerCase();

//   if (allowedTypes.includes(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error("❌ Only images, PDFs, and videos are allowed!"));
//   }
// };

// Multer instance
export const upload = multer({ storage });

export default upload;
