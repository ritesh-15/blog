import { Router } from "express";
import postController from "../controllers/post-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/new-post", authMiddleware, postController.newPost);

export default router;
