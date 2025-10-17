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
exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup_model_1 = __importDefault(require("../models/signup.model")); // ✅ Model renamed
// ✅ Signup API
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword } = req.body;
        // 1️⃣ Check all fields
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: true, message: "All fields are required" });
        }
        // 2️⃣ Check passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }
        // 3️⃣ Check if user already exists
        const existingSignup = yield signup_model_1.default.findOne({ email });
        if (existingSignup) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        // 4️⃣ Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // 5️⃣ Create signup
        const newSignup = yield signup_model_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        // 6️⃣ Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: newSignup._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // must be false for localhost testing
        });
        res.status(201).json({
            success: true,
            message: "Signup successful",
            token,
            signup: {
                id: newSignup._id,
                name: newSignup.name,
                email: newSignup.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.signup = signup;
