import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler";
import { ValidationError } from "sequelize";
import { requestLogger } from "./requestLogger";
import authenticateUser from "./authenticateUser";

let mockReq: Partial<Request>;
let mockRes: Partial<Response>;
let mockNext: NextFunction = jest.fn();

describe("Error Handler Middleware", () => {
  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should respond with a validation error if the error is a Sequelize ValidationError", () => {
    const mockValidationError = new ValidationError("Validation error", []);
    mockValidationError.name = "SequelizeValidationError";

    errorHandler(
      mockValidationError,
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      name: "ValidationError",
      message: [],
    });
  });

  test("should respond with the error name and message for other types of errors", () => {
    const mockError = new Error("Some error");
    mockError.name = "CustomError";

    errorHandler(mockError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      name: "CustomError",
      message: "Some error",
    });
  });
});

describe("Request Logger Middleware", () => {
  test("should log the method and URL of the incoming request", () => {
    mockReq = {
      method: "GET",
      url: "/api/some-endpoint",
    };

    const originalConsoleLog = console.log;
    console.log = jest.fn();

    requestLogger(mockReq as Request, mockRes as Response, mockNext);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("GET /api/some-endpoint")
    );

    console.log = originalConsoleLog;
  });
});

describe("Authentication Middleware", () => {
  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  const generateToken = (payload: any): string => {
    return jwt.sign(payload, process.env.SECRET || "defaultKey");
  };

  test("should pass the request with a valid JWT token", async () => {
    const mockUser = {
      id: 1,
      email: "user@example.com",
    };

    const token = generateToken({ id: mockUser.id });

    mockReq = {
      body: {},
      header: jest.fn().mockReturnValue(`Bearer ${token}`),
    };

    authenticateUser(mockReq as Request, mockRes as Response, mockNext);

    expect(mockReq.body.user.id).toEqual(mockUser.id);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  test("should respond with 401 if the token is not provided", async () => {
    mockReq = {
      header: jest.fn().mockReturnValue(""),
    };

    authenticateUser(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Authentication token not provided",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
