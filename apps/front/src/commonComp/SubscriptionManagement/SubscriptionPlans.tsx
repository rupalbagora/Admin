import { useEffect, useState } from 'react';
import { useRazorpay,type RazorpayOrderOptions } from "react-razorpay";
import axios from '../../api/axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchSubscriptionPlans,
  setCurrentPlan,
} from '../../redux/Slice/SubscriptionPlansSlice/subscriptionPlansSlice';
import type { SubscriptionPlan } from '../../redux/types/subscriptionPlan.types';

const SubscriptionPlans = () => {
  const dispatch = useAppDispatch();
  const { plans, currentPlan } = useAppSelector((state) => state.subscriptionPlans);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
 

  useEffect(() => {
    dispatch(fetchSubscriptionPlans());
  }, [dispatch]);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlanId(plan._id);
    dispatch(setCurrentPlan(plan));
  };
const { Razorpay } = useRazorpay(); // ✅ FIXED

const initiatePayment = async () => {
  if (!selectedPlanId || !currentPlan) return;
  setIsProcessing(true);

  try {
    const { data } = await axios.post(
      '/payments/order',
      { planId: selectedPlanId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const { orderId } = data;

  const options: RazorpayOrderOptions = {
  key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_123456789",
  amount: currentPlan.price * 100,
  currency: (currentPlan.currency || 'INR') as Razorpay.CurrencyCode, // ✅ FIXED
  name: 'Your SaaS Platform',
  description: `${currentPlan.name} Plan`,
  order_id: orderId,
  handler: async (response) => {
    await verifyPayment(response);
  },
  prefill: {
    name: 'John Doe',
    email: 'user@example.com',
    contact: '9999999999',
  },
  theme: {
    color: '#4f46e5',
  },
};


    if (typeof window !== 'undefined' && Razorpay) {
      const rzp = new Razorpay(options);
      rzp.open();
    } else {
      alert('Razorpay SDK not loaded');
    }

  } catch (err) {
    console.error("Payment error:", err);
  } finally {
    setIsProcessing(false);
  }
};


  const verifyPayment = async (paymentResponse: any) => {
    try {
      await axios.post(
        '/payments/verify',
        {
          ...paymentResponse,
          planId: selectedPlanId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`border p-6 rounded-lg ${
              selectedPlanId === plan._id ? 'border-indigo-600' : 'border-gray-300'
            }`}
            onClick={() => handleSelectPlan(plan)}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-lg mt-2">
              {plan.currency}
              {plan.price} / {plan.billingInterval}
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                initiatePayment();
              }}
              disabled={selectedPlanId !== plan._id || isProcessing}
              className={`mt-6 w-full py-2 px-4 text-white rounded ${
                selectedPlanId === plan._id
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isProcessing && selectedPlanId === plan._id ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
