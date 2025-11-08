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

// ✅ Multer storage
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

// ✅ Routes
router.post(
  "/upload",
  upload.fields([
    { name: "image" },
    { name: "icons"},
  ]),
  createProduct
);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
