import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET || "defaultKey";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: "Authentication token not provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    req.body.user = decoded;

    next(); // Move on to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid authentication token" });
  }
};
