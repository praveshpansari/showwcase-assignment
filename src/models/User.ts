// models/user.ts

import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";
import bcrypt from "bcrypt";

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

// We have included `Optional` here to indicate that some attributes are optional during creation
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public validatePassword!: (
    hash: string,
    password: string
  ) => Promise<boolean>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please enter a valid email.",
        }, // Validate email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: "Password should have at least 6 characters.",
        }, // Validate password length
      },
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.beforeCreate(async (user: User) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.validatePassword = async (hash: string, password: string) => {
  return await bcrypt.compare(password, hash);
};

export default User;
