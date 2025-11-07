// src/apis/ourserviceApi/models/ourservice.model.ts
import { Schema, model } from "mongoose";
import { IOurService } from "../types/ourservice.type";

const ourServiceSchema = new Schema<IOurService>(
	{
		serviceName: { type: String, required: true },
		price: { type: Number, required: true },
		title: { type: String, required: true },
		highlights: { type: [String], default: [] },
		estimatedTime: { type: Number, required: true },
		extra: [
			{
				name: { type: String, required: true },
				price: { type: Number, required: true },
			},
		],

		imageUrl: { type: String, required: true },
		addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

export default model<IOurService>("OurService", ourServiceSchema);
