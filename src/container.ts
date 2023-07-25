import AuthController from "./controllers/auth.controller";
import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

class Container {
  private dependencies: { [key: string]: any } = {};

  register(key: string, dependency: any): void {
    this.dependencies[key] = dependency;
  }

  resolve<T>(key: string): T {
    if (!this.dependencies[key]) {
      throw new Error(`Dependency ${key} not registered.`);
    }
    return this.dependencies[key];
  }
}

const container = new Container();

const authService = new AuthService();
const userService = new UserService();

container.register(
  "AuthController",
  new AuthController(authService, userService)
);
container.register("AuthService", authService);
container.register("UserService", userService);

export default container;
