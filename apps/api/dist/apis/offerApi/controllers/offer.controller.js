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
exports.deleteOffer = exports.updateOffer = exports.getOfferById = exports.getAllOffers = exports.createOffer = void 0;
const offer_services_1 = __importDefault(require("../services/offer.services"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customReq = req;
    try {
        const { title, discount, date } = req.body;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!addedBy)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        if (!customReq.file)
            return res
                .status(400)
                .json({ success: false, message: "Image is required!" });
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;
        const newOffer = yield offer_services_1.default.create({
            title,
            discount,
            date,
            imageUrl,
            addedBy,
        });
        res
            .status(201)
            .json({ success: true, message: "Offer created successfully", data: newOffer });
    }
    catch (error) {
        console.error("Error creating offer:", error);
        res
            .status(500)
            .json({ success: false, error: error.message });
    }
});
exports.createOffer = createOffer;
const getAllOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield offer_services_1.default.getAll();
        res.status(200).json({ success: true, data: offers });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: error.message });
    }
});
exports.getAllOffers = getAllOffers;
const getOfferById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const offer = yield offer_services_1.default.getById(id);
        if (!offer)
            return res.status(404).json({ success: false, message: "Offer not found" });
        res.status(200).json({ success: true, data: offer });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: error.message });
    }
});
exports.getOfferById = getOfferById;
const updateOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    try {
        const { id } = req.params;
        const existing = yield offer_services_1.default.getById(id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Offer not found" });
        let imageUrl = existing.imageUrl;
        if (customReq.file) {
            // delete old file
            const oldFilePath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(existing.imageUrl));
            if (fs_1.default.existsSync(oldFilePath))
                fs_1.default.unlinkSync(oldFilePath);
            imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;
        }
        const updated = yield offer_services_1.default.updateById(id, Object.assign(Object.assign({}, req.body), { imageUrl }));
        res.status(200).json({
            success: true,
            message: "Offer updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: error.message });
    }
});
exports.updateOffer = updateOffer;
const deleteOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const offer = yield offer_services_1.default.getById(id);
        if (!offer)
            return res.status(404).json({ success: false, message: "Offer not found" });
        // Delete image from uploads
        const imagePath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(offer.imageUrl));
        if (fs_1.default.existsSync(imagePath))
            fs_1.default.unlinkSync(imagePath);
        yield offer_services_1.default.deleteById(id);
        res.status(200).json({ success: true, message: "Offer deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: error.message });
    }
});
exports.deleteOffer = deleteOffer;
