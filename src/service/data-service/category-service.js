"use strict";

module.exports = class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
  }

  async findAll() {
      return this._Category.findAll({raw: true});
  }

  async findOne(categoryId) {
    return this._Category.findByPk(categoryId);
  }

};
