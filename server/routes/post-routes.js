import { Router } from "express";
import postController from "../controllers/post-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/new-post", authMiddleware, postController.newPost);

router.post("/upload-post-image", authMiddleware, postController.uploadImage);

router.get("/get-posts", authMiddleware, postController.getPosts);

export default router;
