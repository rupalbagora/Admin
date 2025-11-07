import mongoose, { Schema } from "mongoose";

interface IinAppNotification extends Document {
	message: string;
	userId: string;
}

const InAppNotificationSchema = new Schema<IinAppNotification>({
	message: { type: String, required: true },
	userId: { type: String, required: true },
});

export const InAppNotifications = mongoose.model(
	"InAppNotification",
	InAppNotificationSchema
);
