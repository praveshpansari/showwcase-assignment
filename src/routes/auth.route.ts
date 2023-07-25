import container from "../container";
import express from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import AuthController from "../controllers/auth.controller";
import asyncHandler from "../middleware/asyncHandler";

const router = express.Router();

const authController = container.resolve<AuthController>("AuthController");

router.post("/register", asyncHandler(authController.registerUser));
router.post("/login", asyncHandler(authController.loginUser));
router.get(
  "/profile",
  authenticateUser,
  asyncHandler(authController.getUserProfile)
);

export default router;
