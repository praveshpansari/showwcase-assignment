import axios from "axios";
import User, { UserAttributes } from "../models/User";

const RANDOM_USER_API = "https://randomuser.me/api/";

export default class UserService {
  createUser = async (userData: UserAttributes): Promise<User> => {
    const user = await User.create(userData);
    return user;
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  };

  getUsers = async (): Promise<User[]> => {
    const users = await User.findAll();
    return users;
  };

  getUserById = async (id: string): Promise<User | null> => {
    const user = await User.findByPk(id);
    return user;
  };

  getRandomUser = async () => {
    const response = await axios.get(RANDOM_USER_API);
    const user = await response.data;
    return user.results[0];
  };
}
