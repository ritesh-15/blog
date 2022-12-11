import authMiddleware from "../middlewares/authMiddleware.js";
import { Router } from "express";
import userController from "../controllers/user-controller.js";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/check-email/:email", userController.checkEmail);

router.get("/refresh", userController.refresh);

router.post("/logout", userController.logout);

router.post("/update-profile", authMiddleware, userController.updateProfile);

router.post("/forgot-password", userController.forgotPassword);

router.get("/forgot-password/:token", userController.changePassword);

router.post("/change-password");

export default router;
