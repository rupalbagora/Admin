"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageDir = path_1.default.join(__dirname, "../../../../uploads/images");
const videoDir = path_1.default.join(__dirname, "../../../../uploads/videos");
//const imageDir = path.join(uploadBaseDir, "images");
//const videoDir = path.join(uploadBaseDir, "videos");
// 🔥 Function to ensure a directory exists or create it
const ensureDirExists = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created folder: ${dir}`);
    }
};
// Call it for both folders at startup
ensureDirExists(imageDir);
ensureDirExists(videoDir);
// Set storage engine
const storage = multer_1.default.diskStorage({
    destination: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        // Decide folder based on file type
        let targetDir;
        if ([".mp4", ".mov", ".avi", ".mkv"].includes(ext)) {
            targetDir = videoDir; // For videos
        }
        else {
            targetDir = imageDir; // For images
        }
        // Ensure the folder exists before saving
        ensureDirExists(targetDir);
        cb(null, targetDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path_1.default.extname(file.originalname);
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
exports.upload = (0, multer_1.default)({ storage });
exports.default = exports.upload;
