import { Sequelize } from "sequelize";

jest.mock("../src/utils/db.ts", () => {
  return { sequelize: new Sequelize({ dialect: "postgres" }) };
});

import User from "../src/models/User";
import container from "../src/container";
import UserService from "../src/services/user.service";

const userService = container.resolve<UserService>("UserService");

describe("User Service", () => {
  describe("createUser", () => {
    it("should create a new user", async () => {
      const userData = {
        email: "test@example.com",
        password: "testpassword",
      };
      // Set up the mock implementation for User.create
      User.create = jest.fn().mockResolvedValue({ id: 1, ...userData });

      const user = await userService.createUser(userData);
      expect(user).toEqual({ id: 1, ...userData });
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith(userData);
    });
  });

  describe("getUserByEmail", () => {
    it("should get a user by email", async () => {
      const testEmail = "test@example.com";
      const mockUser = { id: 1, email: testEmail, password: "testpassword" };
      // Set up the mock implementation for User.findOne
      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const user = await userService.getUserByEmail(testEmail);
      expect(user).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: testEmail },
      });
    });

    it("should return null if the user is not found", async () => {
      const testEmail = "nonexistent@example.com";
      // Set up the mock implementation for User.findOne when user is not found
      User.findOne = jest.fn().mockResolvedValue(null);

      const user = await userService.getUserByEmail(testEmail);
      expect(user).toBeNull();
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: testEmail },
      });
    });
  });

  describe("getUserById", () => {
    it("should get a user by id", async () => {
      const testId = 1;
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "testpassword",
      };

      // Set up the mock implementation for User.findOne
      User.findByPk = jest.fn().mockResolvedValue(mockUser);

      const user = await userService.getUserById(testId);
      expect(user).toEqual(mockUser);
      expect(User.findByPk).toHaveBeenCalledTimes(1);
      expect(User.findByPk).toHaveBeenCalledWith(testId);
    });

    it("should return null if the user is not found", async () => {
      const testId = 2;
      // Set up the mock implementation for User.findOne when user is not found
      User.findByPk = jest.fn().mockResolvedValue(null);

      const user = await userService.getUserById(testId);
      expect(user).toBeNull();
      expect(User.findByPk).toHaveBeenCalledTimes(1);
      expect(User.findByPk).toHaveBeenCalledWith(testId);
    });
  });
});
