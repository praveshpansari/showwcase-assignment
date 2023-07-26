import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  register = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    const token = this.authService.generateToken({ id: user.id });
    res.status(200).send({
      message: "User successfully created.",
      id: user.id,
      token: token,
    });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        name: "AuthenticationError",
        message: "No user found with this email.",
      });
    }

    if (!(await user.validatePassword(user.password, password))) {
      return res
        .status(401)
        .json({ name: "AuthenticationError", message: "Invalid credentials." });
    }

    const token = this.authService.generateToken({ id: user.id });
    res.status(200).send({
      message: "User successfully logged in.",
      id: user.id,
      token: token,
    });
  };

  getUserProfile = async (req: Request, res: Response) => {
    const { id } = req.body.user;
    const user = await this.userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        name: "AuthenticationError",
        message: "No user found with this email.",
      });
    }
    res
      .status(200)
      .json({ user: { email: user.email, createdAt: user.createdAt } });
  };
}
