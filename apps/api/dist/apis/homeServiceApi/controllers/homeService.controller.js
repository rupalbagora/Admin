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
exports.deleteHomeService = exports.updateHomeService = exports.getHomeServiceById = exports.getHomeServices = exports.createHomeService = void 0;
const homeService_services_1 = __importDefault(require("../services/homeService.services"));
const createHomeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedBy = req.user._id;
        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required!" });
        const newService = yield homeService_services_1.default.create(Object.assign(Object.assign({}, req.body), { addedBy, image: req.file.path }));
        res.status(201).json({ success: true, data: newService });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createHomeService = createHomeService;
const getHomeServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield homeService_services_1.default.getAll();
        res.status(200).json({ success: true, data: services });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getHomeServices = getHomeServices;
const getHomeServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield homeService_services_1.default.getById(req.params.id);
        if (!service)
            return res.status(404).json({ success: false, message: "Service not found" });
        res.status(200).json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getHomeServiceById = getHomeServiceById;
const updateHomeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = Object.assign({}, req.body);
        if (req.file)
            updateData.image = req.file.path;
        const updated = yield homeService_services_1.default.updateById(req.params.id, updateData);
        if (!updated)
            return res.status(404).json({ success: false, message: "Service not found" });
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateHomeService = updateHomeService;
const deleteHomeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield homeService_services_1.default.deleteById(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "Service not found" });
        res.status(200).json({ success: true, message: "Service deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteHomeService = deleteHomeService;
