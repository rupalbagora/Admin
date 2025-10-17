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
exports.deleteSpecialOffer = exports.getAllSpecialOffers = exports.createSpecialOffer = void 0;
const specialoffer_service_1 = __importDefault(require("../services/specialoffer.service"));
// Create Special Offer
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
        const newOffer = yield specialoffer_service_1.default.create({
            tag,
            imageUrl,
            addedBy,
        });
        res.status(201).json({
            success: true,
            message: "Special offer created successfully",
            data: newOffer,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createSpecialOffer = createSpecialOffer;
// Get All Special Offers
const getAllSpecialOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    try {
        const offers = yield specialoffer_service_1.default.getAll();
        res.status(200).json({ success: true, data: offers });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllSpecialOffers = getAllSpecialOffers;
// Delete Special Offer
const deleteSpecialOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield specialoffer_service_1.default.deleteById(id);
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
