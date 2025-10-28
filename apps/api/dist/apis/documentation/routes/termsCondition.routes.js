"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const termsCondition_controller_1 = require("../controllers/termsCondition.controller");
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const router = (0, express_1.Router)();
router.post("/", multerConfig_1.upload.none(), termsCondition_controller_1.createOrUpdateTerms);
router.get("/", termsCondition_controller_1.getTerms);
exports.default = router;
