"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const packages_controller_1 = require("../controllers/packages.controller");
const multerConfig_1 = require("../../mediaApi/services/multerConfig"); // your reusable multer setup
const router = express_1.default.Router();
// Create a new package
router.post("/upload", multerConfig_1.upload.single("image"), packages_controller_1.createPackage);
// Get all packages
router.get("/", packages_controller_1.getAllPackages);
// Get a package by ID
router.get("/:id", packages_controller_1.getPackageById);
// Update a package
router.put("/:id", multerConfig_1.upload.single("image"), packages_controller_1.updatePackage);
// Delete a package
router.delete("/:id", packages_controller_1.deletePackage);
exports.default = router;
