"use strict";
// import { Request, Response } from "express";
// import CertificateService from "../services/certificate.service";
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
exports.updateCertificate = exports.deleteCertificate = exports.getAllCertificates = exports.uploadCertificate = void 0;
const certificate_service_1 = __importDefault(require("../services/certificate.service"));
const path_1 = __importDefault(require("path"));
const uploadCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const addedBy = req.user._id;
        if (!req.file)
            return res.status(400).json({ success: false, message: "Certificate image is required!" });
        const filename = path_1.default.basename(req.file.path); // get just the file name
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${filename}`;
        // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${path.basename(req.file.filename)}`;
        const certificate = yield certificate_service_1.default.create(title, imageUrl, addedBy);
        res.status(201).json({ success: true, data: certificate });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.uploadCertificate = uploadCertificate;
const getAllCertificates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const certificates = yield certificate_service_1.default.getByUser(userId);
        res.status(200).json({ success: true, data: certificates });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllCertificates = getAllCertificates;
const deleteCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield certificate_service_1.default.deleteById(id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "Certificate not found" });
        res.status(200).json({ success: true, message: "Certificate deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteCertificate = deleteCertificate;
const updateCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const certificate = yield certificate_service_1.default.getById(id);
        if (!certificate)
            return res.status(404).json({ message: "Certificate not found" });
        if (req.body.title)
            certificate.title = req.body.title;
        if (req.file) {
            // ✅ Use public URL for updated image
            certificate.imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
        }
        yield certificate.save();
        res.status(200).json({ data: certificate });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateCertificate = updateCertificate;
