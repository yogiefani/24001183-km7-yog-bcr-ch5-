'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.cars,{
        foreignKey: 'createdBy',
        as: 'createdByUser'
      });
      Users.hasMany(models.cars, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser'
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    imageProfile: DataTypes.TEXT,
    role: DataTypes.ENUM('superadmin', 'admin', 'user'),
  }, {
    sequelize,
    paranoid: true,
    modelName: 'users',
    hooks: {
      // Hash password before saving the user
      beforeSave: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });
  return Users;
};