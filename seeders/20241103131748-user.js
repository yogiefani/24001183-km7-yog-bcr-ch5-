"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Users } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
        role: "admin",
      },
      {
        name: "User",
        email: "user@example.com",
        password: "user",
        role: "user",
      },
    ];

    await queryInterface.bulkInsert("Users", usersData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
