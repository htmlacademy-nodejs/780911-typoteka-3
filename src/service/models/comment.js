/* eslint new-cap: ["error", { "properties": false }] */
"use strict";

const {Model, DataTypes} = require(`sequelize`);
const Alias = require("./alias");

module.exports = (sequelize) => {
  class Comment extends Model{}
  Comment.init({
    text: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: `Comment`,
    tableName: Alias.COMMENTS
  });

  return Comment;
};
