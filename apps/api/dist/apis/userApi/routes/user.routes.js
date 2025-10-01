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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/user.routes.ts
const express_1 = __importDefault(require("express"));
const UserController = __importStar(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_1 = require("../middlewares/validate");
const user_validator_1 = require("../validators/user.validator");
const authorizeRole_1 = require("../middlewares/authorizeRole");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("superadmin", "admin"), (0, validate_1.validate)(user_validator_1.createUserSchema), UserController.createUser);
router.get("/", auth_middleware_1.protect, UserController.getUserByEmail); // ?email=user@example.com
router.get("/get/users", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("superadmin", "admin"), UserController.getAllUser);
router.get("/:id", auth_middleware_1.protect, UserController.getUserById);
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), (0, validate_1.validate)(user_validator_1.updateUserSchema), UserController.updateUser);
router.delete("/:id", auth_middleware_1.protect, UserController.deleteUser);
router.patch("/:id/promote", auth_middleware_1.protect, UserController.promoteUser);
router.patch("/:id/demote", auth_middleware_1.protect, UserController.demoteUser);
exports.default = router;
