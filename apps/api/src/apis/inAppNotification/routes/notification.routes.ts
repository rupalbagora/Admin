import express from "express";
import {
	deleteNotificationByNotificationId,
	getNotificationByUserId,
} from "../controller/notification.controller";

const router = express.Router();

router.get("/get-all-notifications-by-userId/:userId", getNotificationByUserId);

router.delete(
	"/delete-notification-by-notificationId/:notificationId",
	deleteNotificationByNotificationId
);

export default router;
