import { Request, Response } from "express";
import { Subscription } from "../models/subscription.model";
import User from "../../userApi/models/User.model";
import { console } from "inspector";

// Create a new subscription
export const createSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    const subscription = new Subscription(req.body);
    const saved = await subscription.save();
    if (!saved) {
      res.status(400).json({ error: "Failed to create subscription" });
      return;
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        subscription: saved._id,
        subscriptionStatus: "active",
        subscriptionStartDate: saved.startDate,
        subscriptionEndDate: saved.endDate,
      },
      { new: true }
    );
    console.log("user>>>>>>>>>>>>>>>>>>>>>",user)
    if (!user) {
      res
        .status(400)
        .json({
          error: "Failed to update user with subscription",
          message: "Failed to update user with subscription",
        });
    return;}
    res.status(201).json({user,saved});
    return;
  } catch (error) {
    res.status(400).json({ error: error });
    return;
  }
};

// Get all subscriptions
export const getAllSubscriptions = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
    return;
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
};

// Get a subscription by ID
export const getSubscriptionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(200).json(subscription);
    return;
  } catch (error) {
    res.status(400).json({ error: error });
    return;
  }
};

// Update a subscription
export const updateSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(200).json(updated);
    return;
  } catch (error) {
    res.status(400).json({ error: error });
    return;
  }
};

// Delete a subscription
export const deleteSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Subscription.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(200).json({ message: "Deleted successfully" });
    return;
  } catch (error) {
    res.status(400).json({ error: error });
    return;
  }
};
