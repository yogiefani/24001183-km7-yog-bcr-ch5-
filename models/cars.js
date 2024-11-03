'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cars.belongsTo(models.Users, {
        foreignKey: 'createdBy',
        as: 'createdByUser'
      });

      Cars.belongsTo(models.Users, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser'
      });
    }
  }
  Cars.init({
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    desc: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'cars',
  });
  return Cars;
};