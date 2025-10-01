import mongoose, { Schema, Document, Types   } from 'mongoose';

export interface IUploadedFile extends Document {
  _id:Types.ObjectId;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer; // Optional, only for memory storage
  url?:  string ,     // Optional file access URL
}

const UploadedFileSchema: Schema = new Schema({
  fieldname: { type: String, required: true },
  originalname: { type: String, required: true },
  encoding: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  destination: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  buffer: { type: Buffer }, // Optional
  url: { type: String }     // Optional
}, {
  timestamps: true // Optional: adds createdAt and updatedAt
});

export default mongoose.model<IUploadedFile>('UploadedFile', UploadedFileSchema);
