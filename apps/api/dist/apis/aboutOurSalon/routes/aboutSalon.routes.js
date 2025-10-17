"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const aboutSalon_controller_1 = require("../controllers/aboutSalon.controller");
const router = express_1.default.Router();
router.post("/upload", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), aboutSalon_controller_1.uploadAboutSalon);
router.get("/", auth_middleware_1.protect, aboutSalon_controller_1.getAllAboutSalon);
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), aboutSalon_controller_1.deleteAboutSalon);
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), aboutSalon_controller_1.updateAboutSalon);
exports.default = router;
