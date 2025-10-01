// types/subscriptionPlan.types.ts

export type BillingInterval = 'month' | 'year';

export interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  currency: string; // ISO code like 'USD', 'INR', etc.
  billingInterval: BillingInterval;
  isActive: boolean;
  trialDays?: number;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}



export interface CreateSubscriptionPlanPayload {
  name: string;
  price: number;
  currency: string;
  billingInterval: BillingInterval;
  isActive?: boolean;
  trialDays?: number;
  features?: string[];
}

export type UpdateSubscriptionPlanPayload = Partial<CreateSubscriptionPlanPayload>;
