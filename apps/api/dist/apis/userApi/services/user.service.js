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
const User_model_1 = __importDefault(require("../models/User.model"));
const user_types_1 = require("../types/user.types");
const mongoose_1 = require("mongoose");
class UserService {
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_model_1.default(Object.assign(Object.assign({}, createUserDto), { role: createUserDto.role || user_types_1.UserRole.USER }));
            yield user.save();
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findById(id);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findOne({ email }).select("+password");
        });
    }
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_model_1.default.findByIdAndDelete(id);
        });
    }
    promoteToAdmin(id, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findByIdAndUpdate(id, { role: user_types_1.UserRole.ADMIN, admin: adminId }, { new: true });
        });
    }
    demoteToUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findByIdAndUpdate(id, { role: user_types_1.UserRole.USER }, { new: true });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.find({
                role: { $nin: ["superadmin"] }, // exclude admins
            });
        });
    }
    getAllUsersForAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ObjectId");
            }
            return User_model_1.default.find({
                admin: id,
                role: { $nin: ["superadmin"] }, // exclude admins
            });
        });
    }
}
exports.default = new UserService();
