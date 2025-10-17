"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/certificate.routes.ts
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const certificate_controllers_1 = require("../controllers/certificate.controllers");
const router = express_1.default.Router();
router.post("/upload", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("certificateImage"), certificate_controllers_1.uploadCertificate);
router.get("/", auth_middleware_1.protect, certificate_controllers_1.getAllCertificates);
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), certificate_controllers_1.deleteCertificate);
// router.put(
//   "/update/:id",
//   protect,
//   authorizeRole("admin,superadmin"),
//   upload.single("certificateImages"),
//   updateCertificate
// )
exports.default = router;
