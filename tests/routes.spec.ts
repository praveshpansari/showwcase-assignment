import request from "supertest";
import { Sequelize } from "sequelize";

jest.mock("../src/utils/db.ts", () => {
  return { sequelize: new Sequelize({ dialect: "postgres" }) };
});

import User from "../src/models/User";
import server from "../src/server";
import AuthService from "../src/services/auth.service";

afterAll(async () => {
  server.close();
});

describe("API Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      // Create a test user object with email and password
      const testUser = {
        email: "test@example.com",
        password: "testpassword",
      };

      User.create = jest
        .fn()
        .mockResolvedValue({ id: 1, email: "test@example.com" });

      // Make a request to the /api/auth/register route
      const response = await request(server)
        .post("/api/auth/register")
        .send(testUser);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body).toHaveProperty("token");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should log in a user and return a token", async () => {
      // Create a test user object with email and password
      const testUser = {
        email: "test@example.com",
        password: "testpassword",
      };

      User.findOne = jest.fn().mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: "hashedpassword",
        validatePassword: jest.fn().mockResolvedValue(true),
      });

      // Make a request to the /api/auth/login route
      const response = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
  });

  describe("GET /api/auth/profile", () => {
    it("should retrieve the user's profile information with a valid token", async () => {
      // Create a test user object with email and password
      const testUser = {
        email: "test@example.com",
        password: "testpassword",
      };

      const token = new AuthService().generateToken({ id: 1 });
      User.findByPk = jest.fn().mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: "testpassword",
      });

      // Make a request to the /api/auth/profile route with the token
      const response = await request(server)
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty("email", testUser.email);
    });

    it("should return 401 with an invalid token", async () => {
      // Make a request to the /api/auth/profile route with an invalid token
      const response = await request(server)
        .get("/api/auth/profile")
        .set("Authorization", "Bearer invalid-token");

      // Assertions
      expect(response.status).toBe(401);
    });

    it("should return 401 without a token", async () => {
      // Make a request to the /api/auth/profile route without a token
      const response = await request(server).get("/api/auth/profile");

      // Assertions
      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/users/random", () => {
    it("should return a random user", async () => {
      const response = await request(server).get("/api/users/random");

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
    }, 15000);
  });
});
