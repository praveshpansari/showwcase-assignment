import container from "../container";
import express from "express";
import authenticateUser from "../middleware/authenticateUser";
import AuthController from "../controllers/auth.controller";
import asyncHandler from "../middleware/asyncHandler";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const router = express.Router();

const authService = container.resolve<AuthService>("AuthService");
const userService = container.resolve<UserService>("UserService");

const authController = new AuthController(authService, userService);

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.get(
  "/profile",
  authenticateUser,
  asyncHandler(authController.getUserProfile)
);

export default router;
