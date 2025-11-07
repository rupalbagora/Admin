import { Request, Response } from "express";
import { InAppNotifications } from "../models/inAppNotification.model";

export const getNotificationByUserId = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const notifications = await InAppNotifications.find({ userId });

		if (!notifications) {
			return res
				.status(201)
				.json({ success: true, message: "No notifications found" });
		}
		return res.status(200).json({
			success: true,
			message: "Notifications fetched Successfully",
			data: notifications,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

export const deleteNotificationByNotificationId = async (
	req: Request,
	res: Response
) => {
	try {
		const { notificationId } = req.params;
		const notifications = await InAppNotifications.findByIdAndDelete(
			notificationId
		);
		if (!notifications) {
			return res
				.status(201)
				.json({ success: true, message: "No notification found" });
		}
		return res.status(200).json({
			success: true,
			message: "Notification deleted successfully!!",
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};
