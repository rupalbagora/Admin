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
exports.deletePackage = exports.updatePackage = exports.getPackageById = exports.getAllPackages = exports.createPackage = void 0;
const packages_model_1 = __importDefault(require("../models/packages.model"));
const createPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageUrl = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`
            : "";
        const newPackage = new packages_model_1.default({
            title: req.body.title,
            price: req.body.price,
            services: req.body.services,
            about: req.body.about,
            discount: req.body.discount,
            review: req.body.review,
            rating: req.body.rating,
            serviceList: req.body.serviceList,
            image: imageUrl,
        });
        const saved = yield newPackage.save();
        res.status(201).json({ success: true, data: saved });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.createPackage = createPackage;
const getAllPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield packages_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: packages });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getAllPackages = getAllPackages;
const getPackageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pkg = yield packages_model_1.default.findById(req.params.id);
        if (!pkg)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res.status(200).json({ success: true, data: pkg });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getPackageById = getPackageById;
const updatePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageUrl = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`
            : req.body.image;
        const updated = yield packages_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { image: imageUrl }), { new: true });
        if (!updated)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res.status(200).json({ success: true, data: updated });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.updatePackage = updatePackage;
const deletePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield packages_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res
            .status(200)
            .json({ success: true, message: "Package deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.deletePackage = deletePackage;
