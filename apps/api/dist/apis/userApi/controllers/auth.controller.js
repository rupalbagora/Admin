"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.checkUserEmailExists = exports.updateUserInfo = exports.getUserProfile = exports.updateProfile = exports.updateToken = exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const mongoose_1 = __importStar(require("mongoose"));
const saveFile_1 = require("../../mediaApi/services/saveFile");
const deleteUploadedFileFromReqFile_1 = require("../../mediaApi/services/deleteUploadedFileFromReqFile");
const updateUploadedFile_1 = require("../../mediaApi/services/updateUploadedFile");
const user_validator_1 = require("../validators/user.validator"); // Your Zod schema
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref } = req.query;
        const userData = req.body;
        // If fullName provided, split automatically
        if (userData.fullName && (!userData.firstName || !userData.lastName)) {
            const nameParts = userData.fullName.trim().split(" ");
            userData.firstName = nameParts[0];
            userData.lastName = nameParts.slice(1).join(" ") || "";
        }
        // Ensure fullName is always set
        if (!userData.fullName && userData.firstName && userData.lastName) {
            userData.fullName = `${userData.firstName} ${userData.lastName}`;
        }
        // Check existing user
        const existingUser = yield User_model_1.default.findOne({ email: userData.email });
        if (existingUser) {
            res.status(409).json({ message: "Email already in use" });
            return;
        }
        // Handle referral case
        if (ref) {
            handleReferralRegistration(req, res, userData, ref.toString());
            return;
        }
        // Normal registration
        const user = new User_model_1.default(userData);
        user.isActive = false;
        yield user.save();
        const token = user.generateAuthToken();
        console.log(token);
        console.log("JWT_SECRET in protect:", process.env.JWT_SECRET);
        res.status(201).json({
            user: formatUserResponse(user),
            token,
        });
        return;
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Registration failed",
            error: process.env.NODE_ENV === "development" ? error : undefined,
        });
        return;
    }
});
exports.register = register;
// Helper function for referral registration
const handleReferralRegistration = (req, res, userData, ref) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(ref)) {
        return res.status(400).json({ message: "Invalid referral ID format" });
    }
    const refUser = yield User_model_1.default.findById(ref);
    if (!refUser) {
        return res.status(404).json({ message: "Referral user not found" });
    }
    const user = yield User_model_1.default.create(Object.assign(Object.assign({}, userData), { refLink: ref, admin: refUser._id }));
    const token = user.generateAuthToken();
    return res.status(201).json({
        user: formatUserResponse(user),
        token,
    });
});
// Format user response (remove sensitive data)
const formatUserResponse = (user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield User_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }
        if (user.subscriptionEndDate) {
            const currentDate = new Date();
            if (currentDate > user.subscriptionEndDate) {
                user.isActive = false;
                yield user.save();
            }
        }
        const token = user.generateAuthToken();
        res.status(200).json({ user, token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.login = login;
// controllers/token.controller.ts
const updateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = req.user;
        if (!user || !user._id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const foundUser = yield User_model_1.default.findById(user._id).populate({
            path: "avatar",
            model: "UploadedFile",
        });
        if (!foundUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const newToken = foundUser.generateAuthToken(); // ✅ use foundUser
        res.status(200).json({
            message: "Token refreshed successfully",
            token: newToken,
            user: {
                _id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                fullName: `${foundUser.firstName} ${foundUser.lastName}`,
                avatar: ((_a = foundUser.avatar) === null || _a === void 0 ? void 0 : _a.url) || null, // ✅ populated avatar
                preferences: foundUser.preferences,
                isVerified: foundUser.isVerified,
                isActive: foundUser.isActive,
                subscriptionType: foundUser.subscriptionType,
                subscriptionStatus: foundUser.subscriptionStatus,
                bio: foundUser.bio,
                dateOfBirth: foundUser.dateOfBirth,
                createdAt: foundUser.createdAt,
                updatedAt: foundUser.updatedAt,
                address: foundUser.address,
            },
        });
    }
    catch (error) {
        console.error("Token refresh error:", error);
        res.status(500).json({ message: "Token refresh failed", error });
    }
});
exports.updateToken = updateToken;
/////////
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized user" });
            return;
        }
        let avatar;
        const existingAvatarId = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.avatar) || ((_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.avatar) === null || _d === void 0 ? void 0 : _d._id);
        if (existingAvatarId) {
            const avatarId = new mongoose_1.Types.ObjectId(existingAvatarId);
            avatar = yield (0, updateUploadedFile_1.updateUploadedFile)(avatarId, req.file);
        }
        else {
            avatar = yield (0, saveFile_1.saveUploadedFile)(req.file);
        }
        yield User_model_1.default.findByIdAndUpdate(userId, { avatar: avatar._id });
        res.status(200).json({ url: avatar.url });
    }
    catch (err) {
        if (req.file) {
            (0, deleteUploadedFileFromReqFile_1.deleteUploadedFileFromReqFile)(req.file);
        }
        console.error("Error updating profile:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
});
exports.updateProfile = updateProfile;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = req.user;
        if (!user || !user._id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const foundUser = yield User_model_1.default.findById(user._id).populate({
            path: "avatar",
            model: "UploadedFile",
        });
        if (!foundUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                _id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                fullName: `${foundUser.firstName} ${foundUser.lastName}`,
                avatar: ((_a = foundUser.avatar) === null || _a === void 0 ? void 0 : _a.url) || null,
                phone: foundUser.phone || null,
                bio: foundUser.bio || null,
                gender: foundUser.gender || null,
                dateOfBirth: foundUser.dateOfBirth || null,
                preferences: foundUser.preferences,
                isVerified: foundUser.isVerified,
                isActive: foundUser.isActive,
                subscriptionType: foundUser.subscriptionType,
                subscriptionStatus: foundUser.subscriptionStatus,
                createdAt: foundUser.createdAt,
                updatedAt: foundUser.updatedAt,
            },
        });
    }
    catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Failed to fetch user profile", error });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Validate incoming data using Zod
        const parseResult = user_validator_1.updateUserSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({ message: "Invalid data", errors: parseResult.error.format() });
            return;
        }
        // const updates = parseResult.data;
        const updatedUser = yield User_model_1.default.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true,
        }).populate("avatar");
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Update user info error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});
exports.updateUserInfo = updateUserInfo;
const checkUserEmailExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (!email || typeof email !== "string") {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const exists = yield User_model_1.default.exists({ email });
        res.status(200).json({ exists: !!exists });
        return;
    }
    catch (error) {
        console.error("Email check error:", error);
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.checkUserEmailExists = checkUserEmailExists;
