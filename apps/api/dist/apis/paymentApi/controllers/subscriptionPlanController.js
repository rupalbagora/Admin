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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionPlan = exports.updateSubscriptionPlan = exports.getSubscriptionPlanById = exports.getAllSubscriptionPlans = exports.createSubscriptionPlan = void 0;
const SubscriptionPlan_model_1 = require("../models/SubscriptionPlan.model");
const createSubscriptionPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, currency, billingInterval, isActive, trialDays, features } = req.body;
        const plan = new SubscriptionPlan_model_1.SubscriptionPlan({
            name,
            price,
            currency,
            billingInterval,
            isActive,
            trialDays,
            features,
        });
        const savedPlan = yield plan.save();
        res.status(201).json(savedPlan);
    }
    catch (error) {
        console.error("Create Subscription Plan Error:", error);
        res.status(400).json({ message: error.message });
    }
});
exports.createSubscriptionPlan = createSubscriptionPlan;
const getAllSubscriptionPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isActive = req.query.isActive;
        const filter = isActive !== undefined ? { isActive: isActive === "true" } : {};
        const plans = yield SubscriptionPlan_model_1.SubscriptionPlan.find(filter).sort({ price: 1 });
        res.status(200).json(plans);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch plans", error: error.message });
    }
});
exports.getAllSubscriptionPlans = getAllSubscriptionPlans;
const getSubscriptionPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield SubscriptionPlan_model_1.SubscriptionPlan.findById(req.params.id);
        if (!plan) {
            res.status(404).json({ message: "Plan not found" });
            return;
        }
        res.status(200).json(plan);
    }
    catch (error) {
        res.status(400).json({ message: "Invalid ID", error: error.message });
    }
});
exports.getSubscriptionPlanById = getSubscriptionPlanById;
const updateSubscriptionPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield SubscriptionPlan_model_1.SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!plan) {
            res.status(404).json({ message: "Plan not found" });
            return;
        }
        res.status(200).json({ message: "Plan updated successfully", plan });
    }
    catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});
exports.updateSubscriptionPlan = updateSubscriptionPlan;
const deleteSubscriptionPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield SubscriptionPlan_model_1.SubscriptionPlan.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "Plan not found" });
            return;
        }
        res.status(200).json({ message: "Plan deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Deletion failed", error: error.message });
    }
});
exports.deleteSubscriptionPlan = deleteSubscriptionPlan;
