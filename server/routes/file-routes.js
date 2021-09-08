import { Router } from "express";
import uploadController from "../controllers/upload-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/update-profile-image",
  authMiddleware,
  uploadController.uploadProfileImage
);

export default router;
