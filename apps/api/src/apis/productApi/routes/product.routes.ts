import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();
// ✅ Store files in appropriate folders
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder =
      file.fieldname === "icons"
        ? path.join(__dirname, "../../../../uploads/icons")
        : path.join(__dirname, "../../../../uploads/images");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Multiple uploads
router.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icons", maxCount: 5 },
  ]),
  createProduct
);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
