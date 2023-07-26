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
container.register("AuthService", new AuthService());
container.register("UserService", new UserService());

export default container;
