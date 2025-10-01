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
exports.updateUploadedFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadedFile_1 = __importDefault(require("../models/uploadedFile")); // Adjust path
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const updateUploadedFile = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield uploadedFile_1.default.findById(id);
        if (!existing) {
            throw new Error("File record not found");
        }
        // Delete old file from disk
        if (existing.path && fs_1.default.existsSync(existing.path)) {
            fs_1.default.unlinkSync(existing.path);
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
        yield existing.save();
        return existing;
    }
    catch (err) {
        console.error("Update file error:", err);
        throw err;
    }
});
exports.updateUploadedFile = updateUploadedFile;
