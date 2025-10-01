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
exports.deleteUploadedFileById = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadedFile_1 = __importDefault(require("../models/uploadedFile")); // Adjust the path as needed
const deleteUploadedFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileRecord = yield uploadedFile_1.default.findById(id);
        if (!fileRecord) {
            throw new Error("File record not found");
        }
        // Delete physical file
        if (fileRecord.path && fs_1.default.existsSync(fileRecord.path)) {
            fs_1.default.unlinkSync(fileRecord.path);
        }
        // Remove record from database
        yield uploadedFile_1.default.findByIdAndDelete(id);
        console.log(`File with ID ${id} deleted successfully`);
    }
    catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
});
exports.deleteUploadedFileById = deleteUploadedFileById;
