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
exports.deleteAboutSalon = exports.updateAboutSalon = exports.getAboutSalonById = exports.getAllAboutSalon = exports.createAboutSalon = void 0;
const aboutSalon_service_1 = __importDefault(require("../services/aboutSalon.service"));
const createAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedBy = req.user._id;
        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required!" });
        const newSalon = yield aboutSalon_service_1.default.create(Object.assign(Object.assign({}, req.body), { addedBy, image: req.file.path }));
        res.status(201).json({ success: true, data: newSalon });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createAboutSalon = createAboutSalon;
const getAllAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salons = yield aboutSalon_service_1.default.getAll();
        res.status(200).json({ success: true, data: salons });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllAboutSalon = getAllAboutSalon;
const getAboutSalonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salon = yield aboutSalon_service_1.default.getById(req.params.id);
        if (!salon)
            return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, data: salon });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAboutSalonById = getAboutSalonById;
const updateAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = Object.assign({}, req.body);
        if (req.file)
            updateData.image = req.file.path;
        const updated = yield aboutSalon_service_1.default.updateById(req.params.id, updateData);
        if (!updated)
            return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateAboutSalon = updateAboutSalon;
const deleteAboutSalon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield aboutSalon_service_1.default.deleteById(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, message: "Salon deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteAboutSalon = deleteAboutSalon;
