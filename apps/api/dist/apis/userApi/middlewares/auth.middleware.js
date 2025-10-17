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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// export interface AuthRequest extends Request {
//   user?: any;
// }
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    console.log("Auth Header received:", req.headers.authorization);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Not authorized, token missing" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        let user = yield User_model_1.default.findById(decoded.id);
        console.log(user);
        if (!user) {
            res.status(401).json({ error: "User no longer exists" });
            return;
        }
        const currentDate = new Date();
        if (user.subscriptionEndDate) {
            if (currentDate > user.subscriptionEndDate && user.isActive) {
                user.isActive = false;
                yield user.save();
            }
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
        // res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
});
exports.protect = protect;
