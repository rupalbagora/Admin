import { Request, Response } from "express";
import OurServiceService from "../services/ourservice.service";
import { CreateOurServiceDto } from "../dtos/ourservice.dto";

// Create Our Service
export const createOurService = async (req: Request, res: Response) => {
	const customReq = req as unknown as {
		file?: Express.Multer.File;
		user?: { _id: string };
	};

	try {
		const {
			serviceName,
			price,
			title,
			highlights,
			extra,
			estimatedTime,
		}: CreateOurServiceDto = req.body;
		const addedBy = customReq.user?._id;

		if (!addedBy) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		if (!customReq.file) {
			return res
				.status(400)
				.json({ success: false, message: "Service image is required!" });
		}
		const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${
			customReq.file.filename
		}`;

		//const imageUrl = customReq.file.path;

		const newService = await OurServiceService.create({
			serviceName,
			price,
			title,
			highlights,
			extra,
			imageUrl,
			addedBy,
			estimatedTime: Number(estimatedTime),
		});

		res.status(201).json({
			success: true,
			message: "Service created successfully",
			data: newService,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

//  Get All Services
export const getAllOurServices = async (req: Request, res: Response) => {
	const customReq = req as unknown as { user?: { _id: string } };

	try {
		const userId = customReq.user?._id;
		if (!userId) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		const services = await OurServiceService.getByUser(userId);
		res.status(200).json({ success: true, data: services });
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

// Delete Service
export const deleteOurService = async (req: Request, res: Response) => {
	const customReq = req as unknown as { user?: { _id: string } };

	try {
		const { id } = req.params;
		const deleted = await OurServiceService.deleteById(id);
		if (!deleted) {
			return res
				.status(404)
				.json({ success: false, message: "Service not found" });
		}

		res
			.status(200)
			.json({ success: true, message: "Service deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};
