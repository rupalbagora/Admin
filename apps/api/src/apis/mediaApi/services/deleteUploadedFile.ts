import fs from "fs";
import UploadedFileModel from "../models/uploadedFile"; // Adjust the path as needed

export const deleteUploadedFileById = async (id: string): Promise<void> => {
  try {
    const fileRecord = await UploadedFileModel.findById(id);

    if (!fileRecord) {
      throw new Error("File record not found");
    }

    // Delete physical file
    if (fileRecord.path && fs.existsSync(fileRecord.path)) {
      fs.unlinkSync(fileRecord.path);
    }

    // Remove record from database
    await UploadedFileModel.findByIdAndDelete(id);
    console.log(`File with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
