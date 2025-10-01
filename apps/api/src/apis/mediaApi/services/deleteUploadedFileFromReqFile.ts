import fs from "fs";
import path from "path";
import UploadedFileModel from "../models/uploadedFile";
import { Express } from "express";

export const deleteUploadedFileFromReqFile = async (file: Express.Multer.File): Promise<void> => {
  try {
    if (!file) {
      throw new Error("No file provided for deletion");
    }

    // Find file record in DB
    const fileRecord = await UploadedFileModel.findOne({ filename: file.filename });

    if (!fileRecord) {
      console.warn(`No DB record found for filename: ${file.filename}`);
    } else {
      await UploadedFileModel.findByIdAndDelete(fileRecord._id);
      console.log(`DB record deleted for file: ${file.filename}`);
    }

    // Delete file from disk
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
      console.log(`Physical file deleted: ${file.path}`);
    } else {
      console.warn(`Physical file not found: ${file.path}`);
    }
  } catch (error) {
    console.error("Error in deleteUploadedFileFromReqFile:", error);
    throw error;
  }
};
