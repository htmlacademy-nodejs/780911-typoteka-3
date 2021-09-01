'use strict';

const {Model, DataTypes} = require(`sequelize`);

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
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'categories'
  });

  return Category;
};
