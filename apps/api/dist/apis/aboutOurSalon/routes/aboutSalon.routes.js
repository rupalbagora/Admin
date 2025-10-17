"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const aboutSalon_controller_1 = require("../controllers/aboutSalon.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = express_1.default.Router();
// Multer setup for image upload
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../../../uploads/aboutSalon"));
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Routes
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), upload.single("image"), aboutSalon_controller_1.createAboutSalon);
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), upload.single("image"), aboutSalon_controller_1.updateAboutSalon);
router.get("/", auth_middleware_1.protect, aboutSalon_controller_1.getAllAboutSalon);
router.get("/:id", auth_middleware_1.protect, aboutSalon_controller_1.getAboutSalonById);
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), aboutSalon_controller_1.deleteAboutSalon);
exports.default = router;
