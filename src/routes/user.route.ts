import container from "../container";
import express from "express";
import { fetchRandomUser } from "../services/thirdParty.service";
import UserService from "../services/user.service";

const router = express.Router();

const userController = container.resolve<UserService>("UserService");

router.get("/random", fetchRandomUser);

router.get("/", async (req, res) => {
  const users = await userController.findAllUser();
  return res.status(200).send({ users });
});

export default router;
