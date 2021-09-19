"use strict";

const {Model, DataTypes} = require(`sequelize`);
const Aliase = require("./aliase");

module.exports = (sequelize) => {
  class Category extends Model{}
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: `Category`,
    tableName: Aliase.CATEGORIES
  });

  return Category;
};
