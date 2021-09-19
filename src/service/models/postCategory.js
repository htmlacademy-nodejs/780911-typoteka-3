"use strict";

const { Model } = require(`sequelize`);
const Alias = require("./alias");

module.exports = (sequelize) => {
  class PostCategory extends Model {}
  PostCategory.init(
    {},
    {
      sequelize,
      modelName: `PostCategory`,
      tableName: Alias.POST_CATEGORIES,
      paranoid: false,
    }
  );

  return PostCategory;
};
