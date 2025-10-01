"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = void 0;
const crypto_1 = __importDefault(require("crypto"));
const subscription_model_1 = __importDefault(require("../models/subscription.model"));
const handleWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers["x-razorpay-signature"];
    const expectedSignature = crypto_1.default
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(req.body))
        .digest("hex");
    if (expectedSignature !== receivedSignature) {
        res.status(400).json({ error: "Invalid webhook signature" });
        return;
    }
    const event = req.body.event;
    const payload = req.body.payload;
    console.log(`🪝 Webhook received: ${event}`);
    if (event === "subscription.charged") {
        const subscriptionId = payload.subscription.entity.id;
        yield subscription_model_1.default.findOneAndUpdate({ razorpaySubscriptionId: subscriptionId }, { status: "active" });
    }
    // Optional: Handle events like payment.failed, subscription.charged, etc.
    res.status(200).json({ status: "ok" });
});
exports.handleWebhook = handleWebhook;
