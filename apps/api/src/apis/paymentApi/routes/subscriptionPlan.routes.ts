import express from 'express';
import {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from '../controllers/subscriptionPlanController';

const router = express.Router();

router.post('/', createSubscriptionPlan);
router.get('/', getAllSubscriptionPlans);
router.get('/:id', getSubscriptionPlanById);
router.put('/:id', updateSubscriptionPlan);
router.delete('/:id', deleteSubscriptionPlan);

export default router;
