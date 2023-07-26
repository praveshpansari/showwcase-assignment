import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET || "default-secret";

export default class AuthService {
  generateToken = (payload: any): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "1d" });
  };

  verifyToken = (token: string): any => {
    return jwt.verify(token, secretKey);
  };
}
