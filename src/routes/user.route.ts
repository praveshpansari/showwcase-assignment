import container from "../container";
import express from "express";
import UserService from "../services/user.service";
import asyncHandler from "../middleware/asyncHandler";
import UserController from "../controllers/user.controller";

const router = express.Router();

const userService = container.resolve<UserService>("UserService");
const userController = new UserController(userService);

router.get("/random", asyncHandler(userController.fetchRandomUser));
router.get("/", asyncHandler(userController.getUsers));

export default router;
