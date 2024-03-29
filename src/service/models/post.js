/* eslint new-cap: ["error", { "properties": false }] */
"use strict";

const {Model, DataTypes} = require(`sequelize`);
const Alias = require("./alias");

module.exports = (sequelize) => {
  class Post extends Model{}
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fullText: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    announce: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(50)
    },
    // authorId : {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // }
  }, {
    sequelize,
    modelName: `Post`,
    tableName: Alias.POSTS,
    paranoid: true,
  });

  Post.prototype.findPage = async({limit, offset})=> {
    const {count, rows} = await Post.findAndCountAll({
      limit,
      offset,
      include: [Alias.CATEGORIES],
      order: [
        [`createdAt`, `DESC`]
      ],
      distinct: true
    });
    return {count, offers: rows};
  }

  return Post;
};
