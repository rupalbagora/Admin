"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aboutUs_controller_1 = require("../controllers/aboutUs.controller");
const multerConfig_1 = require("../../mediaApi/services/multerConfig"); // existing multer
const router = (0, express_1.Router)();
// POST route (form-data text-only)
router.post("/", multerConfig_1.upload.none(), aboutUs_controller_1.createOrUpdateAboutUs);
// GET route
router.get("/", aboutUs_controller_1.getAboutUs);
exports.default = router;
