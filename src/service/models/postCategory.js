"use strict";

const { Model } = require(`sequelize`);

module.exports = (sequelize) => {
  class PostCategory extends Model {}
  PostCategory.init(
    {},
    {
      sequelize,
      timestamps: false,
      paranoid: false,
    }
  );

  return PostCategory;
};