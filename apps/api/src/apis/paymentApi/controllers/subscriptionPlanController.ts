import { Request, Response } from "express";
import { SubscriptionPlan } from "../models/SubscriptionPlan.model";

export const createSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      currency,
      billingInterval,
      isActive,
      trialDays,
      features
    } = req.body;

    const plan = new SubscriptionPlan({
      name,
      price,
      currency,
      billingInterval,
      isActive,
      trialDays,
      features,
    });

    const savedPlan = await plan.save();
    res.status(201).json(savedPlan);
  } catch (error: any) {
    console.error("Create Subscription Plan Error:", error);
    res.status(400).json({ message: error.message });
  }
};


export const getAllSubscriptionPlans = async (req: Request, res: Response) => {
  try { 
    const isActive = req.query.isActive;
    const filter =
      isActive !== undefined ? { isActive: isActive === "true" } : {};

    const plans = await SubscriptionPlan.find(filter).sort({ price: 1 });
    res.status(200).json(plans);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to fetch plans", error: error.message });
  }
};

export const getSubscriptionPlanById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      res.status(404).json({ message: "Plan not found" });
      return;
    }
    res.status(200).json(plan);
  } catch (error: any) {
    res.status(400).json({ message: "Invalid ID", error: error.message });
  }
};

export const updateSubscriptionPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!plan) {
      res.status(404).json({ message: "Plan not found" });
      return;
    }

    res.status(200).json({ message: "Plan updated successfully", plan });
  } catch (error: any) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

export const deleteSubscriptionPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Plan not found" });
      return;
    }
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
};
