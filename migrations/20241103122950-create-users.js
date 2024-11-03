'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        validate: {
          len: [3, 100],
        },
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        validate: {
          len: [6, 100],
        },
        type: Sequelize.TEXT
      },
      photoProfile: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.ENUM('superadmin', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};