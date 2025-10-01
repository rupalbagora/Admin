import express from 'express';
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription
} from '../controllers/subscription.controller';

const router = express.Router();

router.post('/', createSubscription);
router.get('/', getAllSubscriptions);
router.get('/:id', getSubscriptionById);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
