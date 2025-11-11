// routes/user.routes.ts
import express from "express";
import * as UserController from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { updateUserSchema } from "../validators/user.validator";
import { authorizeRole } from "../middlewares/authorizeRole";
import upload from "../../mediaApi/services/multerConfig";

const router = express.Router();

router.post(
	"/",
	protect,
	authorizeRole("superadmin"),
	upload.single("avatar"),
	UserController.createUser
);
router.get("/", protect, UserController.getUserByEmail); // ?email=user@example.com
router.get(
	"/get/users",
	protect,
	authorizeRole("superadmin", "admin"),
	UserController.getAllUser
);
router.get("/:id", protect, UserController.getUserById);
router.put(
	"/:id",
	protect,
	authorizeRole("admin", "superadmin"),
	validate(updateUserSchema),
	upload.single("avatar"),
	UserController.updateUser
);
router.delete("/:id", protect, UserController.deleteUser);
router.patch("/:id/promote", protect, UserController.promoteUser);
router.patch("/:id/demote", protect, UserController.demoteUser);

export default router;
