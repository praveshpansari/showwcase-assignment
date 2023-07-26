"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        email: "user1@example.com",
        password: bcrypt.hashSync("password1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user2@example.com",
        password: bcrypt.hashSync("password2", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
