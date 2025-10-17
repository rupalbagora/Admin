"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const packages_controllers_1 = require("../controllers/packages.controllers");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = express_1.default.Router();
// Admin creates a package
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), packages_controllers_1.createPackage);
router.get("/", auth_middleware_1.protect, packages_controllers_1.getPackages); // ✅ protect route
router.get("/:id", auth_middleware_1.protect, packages_controllers_1.getPackageById); // ✅ optional protect
// Admin: delete package
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), packages_controllers_1.deletePackage);
exports.default = router;
