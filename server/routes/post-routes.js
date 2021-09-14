import { Router } from "express";
import postController from "../controllers/post-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/new-post", authMiddleware, postController.newPost);

router.post("/upload-post-image", authMiddleware, postController.uploadImage);

router.get("/get-posts", postController.getPosts);

router.get("/get-post/:id", postController.getPost);

router.get("/get-user-posts", authMiddleware, postController.userPosts);

router.post("/delete-post/:id", authMiddleware, postController.deletePost);

router.post("/like-post/:id", authMiddleware, postController.likePost);

router.post("/unlike-post/:id", authMiddleware, postController.unLikePost);

router.get("/is-liked/:id", authMiddleware, postController.isLiked);

router.get("/total-likes/:id", authMiddleware, postController.getTotalLikes);

router.post("/update-post/:id", authMiddleware, postController.updatePost);

router.post("/new-comment/:id", authMiddleware, postController.newComment);

router.get("/get-comments/:id", authMiddleware, postController.getComments);

export default router;
