import { Router } from "express";
import { createOrUpdateTerms, getTerms } from "../controllers/termsCondition.controller";
import { upload } from "../../mediaApi/services/multerConfig";

const router = Router();
router.post("/", upload.none(), createOrUpdateTerms);
router.get("/", getTerms);

export default router;
