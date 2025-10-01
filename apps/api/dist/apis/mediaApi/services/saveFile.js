"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUploadedFile = void 0;
const dotenv_1 = require("dotenv");
const uploadedFile_1 = __importDefault(require("../models/uploadedFile"));
(0, dotenv_1.config)();
const saveUploadedFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new Error("No file provided");
    }
    const newFile = new uploadedFile_1.default({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
        buffer: file.buffer, // Only present if you're using memoryStorage
        url: `${process.env.URL}/uploads/${file.filename}` // Adjust this based on your file server logic
    });
    return yield newFile.save();
});
exports.saveUploadedFile = saveUploadedFile;
