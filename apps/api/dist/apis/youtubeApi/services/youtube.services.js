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
const youtube_models_1 = __importDefault(require("../models/youtube.models"));
class YoutubeService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = new youtube_models_1.default(data);
            return video.save();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return youtube_models_1.default.find().sort({ createdAt: -1 });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return youtube_models_1.default.findById(id);
        });
    }
    getByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            return youtube_models_1.default.find({
                uploadedAt: { $gte: startOfDay, $lte: endOfDay },
            }).sort({ createdAt: -1 });
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return youtube_models_1.default.findByIdAndUpdate(id, data, { new: true });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return youtube_models_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new YoutubeService();
