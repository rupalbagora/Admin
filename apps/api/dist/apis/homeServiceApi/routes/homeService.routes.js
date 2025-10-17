"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeService_controller_1 = require("../controllers/homeService.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const multerConfig_1 = require("../../mediaApi/services/multerConfig"); // multer config
const router = express_1.default.Router();
// Create home service with image
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), homeService_controller_1.createHomeService);
// Update home service (image optional)
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), homeService_controller_1.updateHomeService);
// Get all / Get by ID / Delete
router.get("/", auth_middleware_1.protect, homeService_controller_1.getHomeServices);
router.get("/:id", auth_middleware_1.protect, homeService_controller_1.getHomeServiceById);
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), homeService_controller_1.deleteHomeService);
exports.default = router;
