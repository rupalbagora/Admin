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
exports.deleteProductPackage = exports.getProductPackageById = exports.getProductPackages = exports.createProductPackage = void 0;
const productPackage_services_1 = __importDefault(require("../services/productPackage.services"));
const createProductPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedBy = req.user._id;
        const newPackage = yield productPackage_services_1.default.create(Object.assign(Object.assign({}, req.body), { addedBy }));
        res.status(201).json({ success: true, data: newPackage });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createProductPackage = createProductPackage;
const getProductPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const packages = yield productPackage_services_1.default.getAll(userId);
        res.status(200).json({ success: true, data: packages });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getProductPackages = getProductPackages;
const getProductPackageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pkg = yield productPackage_services_1.default.getById(req.params.id);
        if (!pkg)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res.status(200).json({ success: true, data: pkg });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getProductPackageById = getProductPackageById;
const deleteProductPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield productPackage_services_1.default.deleteById(req.params.id);
        if (!deleted)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res
            .status(200)
            .json({ success: true, message: "Package deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteProductPackage = deleteProductPackage;
