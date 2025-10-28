"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = __importDefault(require("../../mediaApi/services/multerConfig")); // ✅ default export
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const specialoffers_controller_1 = require("../controllers/specialoffers.controller");
const router = express_1.default.Router();
// 1️⃣ Create Special Offer
// Upload an image and save offer details
router.post("/upload", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.default.single("image"), // 'image' must match the form-data key in Postman
specialoffers_controller_1.createSpecialOffer);
// 2️⃣ Get All Special Offers
router.get("/", auth_middleware_1.protect, specialoffers_controller_1.getAllSpecialOffers);
// 3️⃣ Get Special Offer by ID
router.get("/:id", auth_middleware_1.protect, specialoffers_controller_1.getSpecialOfferById);
// 4️⃣ Update Special Offer by ID
router.patch("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.default.single("image"), // optional image update
specialoffers_controller_1.updateSpecialOffer);
// 5️⃣ Delete Special Offer by ID
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), specialoffers_controller_1.deleteSpecialOffer);
exports.default = router;
