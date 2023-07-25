import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("showwcase", "admin", "admin", {
  host: "localhost",
  dialect: "postgres",
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.model;

export default sequelize;
