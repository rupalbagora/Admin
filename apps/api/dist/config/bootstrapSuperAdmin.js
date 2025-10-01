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
exports.createSuperAdminIfNotExists = void 0;
const User_model_1 = __importDefault(require("../apis/userApi/models/User.model"));
const createSuperAdminIfNotExists = () => __awaiter(void 0, void 0, void 0, function* () {
    const superAdminEmail = "admin@example.com";
    const existing = yield User_model_1.default.findOne({ email: superAdminEmail, role: "superadmin" });
    // console.log("..........",existing)
    if (!existing) {
        const password = "Admin@123";
        yield User_model_1.default.create({
            firstName: "Super",
            lastName: "Admin",
            email: superAdminEmail,
            password,
            role: "superadmin",
            isVerified: true
        });
        console.log("✅ Superadmin created");
    }
    else {
        console.log("🟢 Superadmin already exists");
    }
});
exports.createSuperAdminIfNotExists = createSuperAdminIfNotExists;
