"use strict";

const {Model, DataTypes} = require(`sequelize`);
const Aliase = require("./aliase");

module.exports = (sequelize) => {
  class Comment extends Model{}
  Comment.init({
    text: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: `Comment`,
    tableName: Aliase.COMMENTS
  });

  return Comment;
};
