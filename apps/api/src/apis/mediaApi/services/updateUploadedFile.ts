import fs from "fs";
import UploadedFileModel, { IUploadedFile } from "../models/uploadedFile"; // Adjust path
import { config } from "dotenv";
import { Types } from "mongoose";
config()
export const updateUploadedFile = async (
  id: Types.ObjectId,
  file: Express.Multer.File
): Promise<IUploadedFile> => {
  try {
    const existing = await UploadedFileModel.findById(id);
    if (!existing) {
      throw new Error("File record not found");
    }

    // Delete old file from disk
    if (existing.path && fs.existsSync(existing.path)) {
      fs.unlinkSync(existing.path);
    }

    // Update document fields
    existing.fieldname = file.fieldname;
    existing.originalname = file.originalname;
    existing.encoding = file.encoding;
    existing.mimetype = file.mimetype;
    existing.size = file.size;
    existing.destination = file.destination;
    existing.filename = file.filename;
    existing.path = file.path;
    existing.buffer = file.buffer;
    existing.url = `${process.env.URL}/uploads/${file.filename}`; // If you're serving from `/uploads`

    await existing.save();
    return existing;
  } catch (err) {
    console.error("Update file error:", err);
    throw err;
  }
};
