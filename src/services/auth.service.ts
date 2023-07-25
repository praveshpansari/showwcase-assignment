import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET || "defaultKey";

export default class AuthService {
  generateToken = (payload: any): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "1d" });
  };

  verifyToken = (token: string): any => {
    return jwt.verify(token, secretKey);
  };
}
