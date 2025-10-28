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
exports.deleteSpecialOffer = exports.updateSpecialOffer = exports.getSpecialOfferById = exports.getAllSpecialOffers = exports.createSpecialOffer = void 0;
const specialoffers_services_1 = __importDefault(require("../services/specialoffers.services"));
// 1️⃣ Create Special Offer
const createSpecialOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customReq = req;
    try {
        const { tag } = req.body;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!addedBy) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (!customReq.file) {
            return res.status(400).json({ success: false, message: "Offer image is required!" });
        }
        const imageUrl = customReq.file.path;
        const newOffer = yield specialoffers_services_1.default.create({ tag, imageUrl, addedBy });
        res.status(201).json({
            success: true,
            message: "Special offer created successfully",
            data: newOffer,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createSpecialOffer = createSpecialOffer;
// 2️⃣ Get All Special Offers
const getAllSpecialOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield specialoffers_services_1.default.getAll();
        res.status(200).json({ success: true, data: offers });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllSpecialOffers = getAllSpecialOffers;
// 3️⃣ Get Special Offer by ID
const getSpecialOfferById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const offer = yield specialoffers_services_1.default.getById(id);
        if (!offer) {
            return res.status(404).json({ success: false, message: "Special offer not found" });
        }
        res.status(200).json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getSpecialOfferById = getSpecialOfferById;
// 4️⃣ Update Special Offer
const updateSpecialOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    try {
        const { id } = req.params;
        const { tag } = req.body;
        const updateData = {};
        if (tag)
            updateData.tag = tag;
        if (customReq.file)
            updateData.image = customReq.file.path;
        const updatedOffer = yield specialoffers_services_1.default.updateById(id, updateData);
        if (!updatedOffer) {
            return res.status(404).json({ success: false, message: "Special offer not found" });
        }
        res.status(200).json({
            success: true,
            message: "Special offer updated successfully",
            data: updatedOffer,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateSpecialOffer = updateSpecialOffer;
// 5️⃣ Delete Special Offer
const deleteSpecialOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield specialoffers_services_1.default.deleteById(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Special offer not found" });
        }
        res.status(200).json({ success: true, message: "Special offer deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteSpecialOffer = deleteSpecialOffer;
