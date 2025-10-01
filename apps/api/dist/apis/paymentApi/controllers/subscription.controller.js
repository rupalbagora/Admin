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
exports.deleteSubscription = exports.updateSubscription = exports.getSubscriptionById = exports.getAllSubscriptions = exports.createSubscription = void 0;
const subscription_model_1 = require("../models/subscription.model");
const User_model_1 = __importDefault(require("../../userApi/models/User.model"));
const inspector_1 = require("inspector");
// Create a new subscription
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const subscription = new subscription_model_1.Subscription(req.body);
        const saved = yield subscription.save();
        if (!saved) {
            res.status(400).json({ error: "Failed to create subscription" });
            return;
        }
        const user = yield User_model_1.default.findByIdAndUpdate(userId, {
            subscription: saved._id,
            subscriptionStatus: "active",
            subscriptionStartDate: saved.startDate,
            subscriptionEndDate: saved.endDate,
        }, { new: true });
        inspector_1.console.log("user>>>>>>>>>>>>>>>>>>>>>", user);
        if (!user) {
            res
                .status(400)
                .json({
                error: "Failed to update user with subscription",
                message: "Failed to update user with subscription",
            });
            return;
        }
        res.status(201).json({ user, saved });
        return;
    }
    catch (error) {
        res.status(400).json({ error: error });
        return;
    }
});
exports.createSubscription = createSubscription;
// Get all subscriptions
const getAllSubscriptions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield subscription_model_1.Subscription.find();
        res.status(200).json(subscriptions);
        return;
    }
    catch (error) {
        res.status(500).json({ error: error });
        return;
    }
});
exports.getAllSubscriptions = getAllSubscriptions;
// Get a subscription by ID
const getSubscriptionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subscription = yield subscription_model_1.Subscription.findById(id);
        if (!subscription) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.status(200).json(subscription);
        return;
    }
    catch (error) {
        res.status(400).json({ error: error });
        return;
    }
});
exports.getSubscriptionById = getSubscriptionById;
// Update a subscription
const updateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield subscription_model_1.Subscription.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.status(200).json(updated);
        return;
    }
    catch (error) {
        res.status(400).json({ error: error });
        return;
    }
});
exports.updateSubscription = updateSubscription;
// Delete a subscription
const deleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield subscription_model_1.Subscription.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.status(200).json({ message: "Deleted successfully" });
        return;
    }
    catch (error) {
        res.status(400).json({ error: error });
        return;
    }
});
exports.deleteSubscription = deleteSubscription;
