"use strict";

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Comment extends Model{}
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  }, {
    sequelize,
  });

  return Comment;
};
