import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  if (error instanceof ValidationError) {
    res.status(400);
    res.json({
      name: "ValidationError",
      message: error.errors.map((err) => err.message),
    });
  } else {
    res.status(res.statusCode ?? 500);
    res.json({
      name: error.name,
      message: error.message,
    });
  }
};
