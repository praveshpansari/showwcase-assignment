import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    return res.status(200).send({ users });
  };

  fetchRandomUser = async (req: Request, res: Response) => {
    const user = await this.userService.getRandomUser();
    return res.status(200).send({ user });
  };
}
