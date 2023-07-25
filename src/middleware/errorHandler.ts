import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  if (error instanceof ValidationError)
    res.json({
      name: "ValidationError",
      message: error.errors.map((err) => err.message),
    });
  else
    res.json({
      name: error.name,
      message: error.message,
    });
};
