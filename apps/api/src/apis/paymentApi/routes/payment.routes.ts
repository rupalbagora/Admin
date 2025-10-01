// routes/payment.routes.ts
import express from "express";
import { protect } from "../../userApi/middlewares/auth.middleware";
import {
  createSubscriptionOrder,
  verifyPayment
} from "../controllers/subscriptionController";
import { handleWebhook } from "../controllers/webhook.controller";

const router = express.Router();

router.post("/order", protect, createSubscriptionOrder);
router.post("/verify", protect, verifyPayment);
// router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

export default router;
