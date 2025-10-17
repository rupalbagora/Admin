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
const productPackage_model_1 = __importDefault(require("../models/productPackage.model"));
class ProductPackageService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const pkg = new productPackage_model_1.default(data);
            return pkg.save();
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return productPackage_model_1.default.find({ addedBy: userId }).sort({ createdAt: -1 });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return productPackage_model_1.default.findById(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return productPackage_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new ProductPackageService();
