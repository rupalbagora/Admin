import { config } from "dotenv";
import UploadedFileModel, { IUploadedFile } from "../models/uploadedFile";
import { Request } from "express";
config();

export const saveUploadedFile = async (
	file: Express.Multer.File
): Promise<IUploadedFile> => {
	if (!file) {
		throw new Error("No file provided");
	}

	const newFile = new UploadedFileModel({
		fieldname: file.fieldname,
		originalname: file.originalname,
		encoding: file.encoding,
		mimetype: file.mimetype,
		size: file.size,
		destination: file.destination,
		filename: file.filename,
		path: file.path,
		buffer: file.buffer, // Only present if you're using memoryStorage
		url: `${process.env.URL}/uploads/images/${file.filename}`, // Adjust this based on your file server logic
	});

	return await newFile.save();
};
