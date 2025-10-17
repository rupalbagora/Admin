"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productPackage_controller_1 = require("../controllers/productPackage.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = express_1.default.Router();
// Admin: create a product package
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), productPackage_controller_1.createProductPackage);
// Get all packages for logged-in admin
router.get("/", auth_middleware_1.protect, productPackage_controller_1.getProductPackages);
// Get package details by ID
router.get("/:id", auth_middleware_1.protect, productPackage_controller_1.getProductPackageById);
// Delete a product package
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), productPackage_controller_1.deleteProductPackage);
exports.default = router;
