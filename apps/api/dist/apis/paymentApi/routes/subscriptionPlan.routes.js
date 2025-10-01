"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionPlanController_1 = require("../controllers/subscriptionPlanController");
const router = express_1.default.Router();
router.post('/', subscriptionPlanController_1.createSubscriptionPlan);
router.get('/', subscriptionPlanController_1.getAllSubscriptionPlans);
router.get('/:id', subscriptionPlanController_1.getSubscriptionPlanById);
router.put('/:id', subscriptionPlanController_1.updateSubscriptionPlan);
router.delete('/:id', subscriptionPlanController_1.deleteSubscriptionPlan);
exports.default = router;
