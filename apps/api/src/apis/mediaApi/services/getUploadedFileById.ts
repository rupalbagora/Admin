import UploadedFileModel from "../models/uploadedFile"; // adjust path as needed
import { IUploadedFile } from "../models/uploadedFile";

export const getUploadedFileById = async (
  id: string
): Promise<IUploadedFile | null> => {
  try {
    const file = await UploadedFileModel.findById(id);
    if (!file) {
      throw new Error("File not found");
    }
    return file;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};
