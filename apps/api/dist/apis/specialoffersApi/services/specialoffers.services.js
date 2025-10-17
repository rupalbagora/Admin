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
const specialoffers_models_1 = __importDefault(require("../models/specialoffers.models"));
class SpecialOfferService {
    // 🟢 Create Special Offer
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOffer = new specialoffers_models_1.default({
                tag: data.tag,
                image: data.imageUrl,
                addedBy: data.addedBy,
            });
            return newOffer.save();
        });
    }
    // 🟠 Get All Offers
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return specialoffers_models_1.default.find()
                .populate("addedBy", "name email")
                .sort({ createdAt: -1 });
        });
    }
    // 🔴 Delete Offer by ID
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return specialoffers_models_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new SpecialOfferService();
