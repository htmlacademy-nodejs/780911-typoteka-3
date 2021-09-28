"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Alias = require("./alias");

module.exports = (sequelize) => {
  class Category extends Model {
  }

  Category.init({
      name: {
        type: DataTypes.STRING,
          allowNull: false,
        },
  }, {
      sequelize,
        freezeTableName: true,
        modelName: `Category`,
        tableName: Alias.CATEGORIES
    });
  return Category;
};
