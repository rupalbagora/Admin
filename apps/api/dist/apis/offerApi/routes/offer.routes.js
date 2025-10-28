"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const offer_controller_1 = require("../controllers/offer.controller");
const router = express_1.default.Router();
// CREATE
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("imageUrl"), offer_controller_1.createOffer);
// READ ALL
router.get("/", offer_controller_1.getAllOffers);
// READ SINGLE
router.get("/:id", offer_controller_1.getOfferById);
// UPDATE
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("imageUrl"), offer_controller_1.updateOffer);
// DELETE
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), offer_controller_1.deleteOffer);
exports.default = router;
