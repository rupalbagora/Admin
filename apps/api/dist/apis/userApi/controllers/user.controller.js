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
exports.getAllUser = exports.demoteUser = exports.promoteUser = exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const User_model_1 = __importDefault(require("../models/User.model"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, email, password, phone, address, status, subscriptionPeriod, customDate, image } = req.body;
        console.log("................");
        const newUser = yield user_service_1.default.createUser({
            firstName,
            email,
            password,
            phone,
            address,
            isActive: status === 'active',
            subscriptionPeriod,
            expireDate: subscriptionPeriod === 'custom' && customDate ? customDate : undefined,
            avatar: image || undefined,
            // admin: req.user?._id
        });
        res.status(201).json({ message: "User created", user: newUser });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: "Validation failed",
                errors: error.errors,
            });
            return;
        }
        res.status(500).json({
            message: "Registration failed",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (typeof email !== "string") {
            res.status(400).json({ error: "Invalid email" });
            return;
        }
        const user = yield user_service_1.default.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_model_1.default.find({ _id: req.params.id, admin: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!user) {
            res.status(401).json({ error: "Not authorized" });
            return;
        }
        const updated = yield user_service_1.default.updateUser(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ message: "User updated", user: updated });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_service_1.default.deleteUser(req.params.id);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteUser = deleteUser;
const promoteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_service_1.default.promoteToAdmin(req.params.id, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        res.status(200).json({ message: "User promoted to admin", user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.promoteUser = promoteUser;
const demoteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.demoteToUser(req.params.id);
        res.status(200).json({ message: "User demoted to user", user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.demoteUser = demoteUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let users;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role.toLocaleLowerCase()) === "superadmin".toLocaleLowerCase()) {
            users = yield user_service_1.default.getAllUsers();
        }
        else {
            users = yield user_service_1.default.getAllUsersForAdmin((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
        }
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});
exports.getAllUser = getAllUser;
