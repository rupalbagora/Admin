"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const specialoffers_controller_1 = require("../controllers/specialoffers.controller");
const router = express_1.default.Router();
//  Create Special Offer
router.post("/upload", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), // 'image' is the field name for Multer
specialoffers_controller_1.createSpecialOffer);
//  Get All Special Offers
router.get("/", auth_middleware_1.protect, specialoffers_controller_1.getAllSpecialOffers);
//  Delete Special Offer
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), specialoffers_controller_1.deleteSpecialOffer);
exports.default = router;
