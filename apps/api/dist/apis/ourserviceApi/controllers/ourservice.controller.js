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
exports.deleteOurService = exports.getAllOurServices = exports.createOurService = void 0;
const ourservice_service_1 = __importDefault(require("../services/ourservice.service"));
// Create Our Service
const createOurService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customReq = req;
    try {
        const { serviceName, price, title, highlights, extra } = req.body;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!addedBy) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (!customReq.file) {
            return res.status(400).json({ success: false, message: "Service image is required!" });
        }
        const imageUrl = customReq.file.path;
        const newService = yield ourservice_service_1.default.create({
            serviceName,
            price,
            title,
            highlights,
            extra,
            imageUrl,
            addedBy,
        });
        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newService,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createOurService = createOurService;
//  Get All Services
const getAllOurServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customReq = req;
    try {
        const userId = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const services = yield ourservice_service_1.default.getByUser(userId);
        res.status(200).json({ success: true, data: services });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllOurServices = getAllOurServices;
// Delete Service
const deleteOurService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    try {
        const { id } = req.params;
        const deleted = yield ourservice_service_1.default.deleteById(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, message: "Service deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteOurService = deleteOurService;
