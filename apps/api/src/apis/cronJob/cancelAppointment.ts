import cron from "node-cron";
import dayjs from "dayjs";
import appointmentModel from "../appointmentApi/models/appointment.model";
import { InAppNotifications } from "../inAppNotification/models/inAppNotification.model";

export const cancelAppointmentAfter10Minutes = () => {
	cron.schedule("* * * * *", async () => {
		try {
			const now = dayjs();
			const threshold = now.subtract(10, "minute").toISOString();

			const expiredAppointments = await appointmentModel.find({
				appointmentStatus: "Pending",
				fromDateTime: { $lte: threshold },
			});

			for (const appointment of expiredAppointments) {
				// send notification
				await InAppNotifications.create({
					message: `Your appointment scheduled on ${dayjs(
						appointment.fromDateTime
					)
						.tz("Asia/Kolkata")
						.format(
							"DD-MMM-YYYY [at]  hh:mm A"
						)} has expired. Please reschedule the appointment.`,
					userId: appointment.userId,
				});

				// delete or update status
				await appointmentModel.findByIdAndDelete(appointment._id);
			}

			if (expiredAppointments.length)
				console.log(
					`Deleted ${expiredAppointments.length} expired appointments`
				);
		} catch (error) {
			console.error("Cron job error:", error);
		}
	});
};
