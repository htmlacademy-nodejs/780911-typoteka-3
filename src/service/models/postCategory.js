"use strict";

const { Model } = require(`sequelize`);
const Aliase = require("./aliase");

module.exports = (sequelize) => {
  class PostCategory extends Model {}
  PostCategory.init(
    {},
    {
      sequelize,
      modelName: `PostCategory`,
      tableName: Aliase.POST_CATEGORIES,
      paranoid: false,
    }
  );

  return PostCategory;
};
