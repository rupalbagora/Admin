"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const privacyPolicy_controller_1 = require("../controllers/privacyPolicy.controller");
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const router = (0, express_1.Router)();
router.post("/", multerConfig_1.upload.none(), privacyPolicy_controller_1.createOrUpdatePrivacy);
router.get("/", privacyPolicy_controller_1.getPrivacy);
exports.default = router;
