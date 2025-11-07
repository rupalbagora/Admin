import cron from "node-cron";
import dayjs from "dayjs";

import { InAppNotifications } from "../inAppNotification/models/inAppNotification.model";

export const delete7daysOldNotifications = () => {
	cron.schedule("0 0 * * *", async () => {
		try {
			const sevenDaysAgo = dayjs().subtract(7, "day").toDate();

			const result = await InAppNotifications.deleteMany({
				updatedAt: { $lte: sevenDaysAgo },
			});

			console.log(`Deleted ${result.deletedCount} old notifications`);
		} catch (error) {
			console.error("Error deleting old notifications:", error);
		}
	});
};
