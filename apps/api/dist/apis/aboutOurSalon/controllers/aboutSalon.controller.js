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
exports.updateAboutSalon = exports.deleteAboutSalon = exports.getAllAboutSalon = exports.uploadAboutSalon = void 0;
const aboutSalon_service_1 = __importDefault(require("../services/aboutSalon.service"));
const uploadAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const addedBy = req.user._id;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Salon image is required!" });
        }
        const image = req.file.path;
        const salon = yield aboutSalon_service_1.default.create(title, description, image, addedBy);
        res.status(201).json({ success: true, data: salon });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.uploadAboutSalon = uploadAboutSalon;
const getAllAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const salons = yield aboutSalon_service_1.default.getByUser(userId);
        res.status(200).json({ success: true, data: salons });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllAboutSalon = getAllAboutSalon;
const deleteAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield aboutSalon_service_1.default.deleteById(id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "About Salon not found" });
        res.status(200).json({ success: true, message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteAboutSalon = deleteAboutSalon;
const updateAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = {};
        if (req.body.title)
            updateData.title = req.body.title;
        if (req.body.description)
            updateData.description = req.body.description;
        if (req.file)
            updateData.image = req.file.path;
        const updated = yield aboutSalon_service_1.default.update(id, updateData);
        if (!updated)
            return res.status(404).json({ success: false, message: "About Salon not found" });
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateAboutSalon = updateAboutSalon;
