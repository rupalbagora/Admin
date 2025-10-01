export interface IMedia {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;         // Optional: for memory storage (e.g. Multer memoryStorage)
  url?: string;            // Optional: public file URL
}
