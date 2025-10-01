export interface Subscription {
  _id?: string;
  startDate: string;
  endDate: string;
  amount: number;
  studentLimit: number;
  staffLimit: number;
  features: string[];
}
export type  ExtendedSubscription = Subscription & { userId: string };

