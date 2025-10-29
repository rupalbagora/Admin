import { Router } from "express";
import {
  createCart,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cart.controller";
import { upload } from "../../mediaApi/services/multerConfig"; // adjust path as per your multer file

const router = Router();

router.post("/", upload.single("image"), createCart);
router.get("/", getAllCartItems);
router.get("/:id", getCartItemById);
router.put("/:id", upload.single("image"), updateCartItem);
router.delete("/:id", deleteCartItem);

export default router;
