"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/payment.routes.ts
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const subscriptionController_1 = require("../controllers/subscriptionController");
const router = express_1.default.Router();
router.post("/order", auth_middleware_1.protect, subscriptionController_1.createSubscriptionOrder);
router.post("/verify", auth_middleware_1.protect, subscriptionController_1.verifyPayment);
// router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);
exports.default = router;
