import mongoose, { Types, Schema } from "mongoose";

export interface IChairs {
	chairNumber: number;
	isChairAvailable: boolean;
	subAdminId: string | Types.ObjectId;
	subAdminEmail: string;
}

const chairsSchema = new mongoose.Schema<IChairs>(
	{
		chairNumber: { type: Number },
		isChairAvailable: { type: Boolean, default: true },
		subAdminId: { type: Schema.Types.ObjectId },
		subAdminEmail: { type: String },
	},
	{ timestamps: true }
);

export const ChairsModel = mongoose.model("Chair", chairsSchema);
