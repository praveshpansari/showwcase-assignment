import User, { UserAttributes } from "../models/User"; // Create User model according to your database schema
import bcrypt from "bcrypt";

export default class UserService {
  createUser = async (userData: UserAttributes): Promise<User> => {
    // Implement user creation logic in the database
    const user = await User.create(userData);
    return user;
  };

  findUserByEmail = async (email: string): Promise<User | null> => {
    // Implement user retrieval logic by email in the database
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  };

  findAllUser = async (): Promise<User[]> => {
    // Implement user retrieval logic by email in the database
    const users = await User.findAll();
    return users;
  };

  getUserById = async (id: string): Promise<User | null> => {
    const user = await User.findByPk(id);
    return user;
  };
}
