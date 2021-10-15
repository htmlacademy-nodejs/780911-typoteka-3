"use strict";

const Alias = require("../models/alias");
const Sequelize = require(`sequelize`);

module.exports = class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._PostCategory = sequelize.models.PostCategory;
  }

  async findAll(withCount) {
    if (withCount) {
      const categories = await this._Category.findAll({
        attributes: [
          `id`,
          `name`,
          [
            Sequelize.fn(
              `COUNT`,
              Sequelize.col(`CategoryId`)
            ),
            `count`
          ]
        ],
        group: [Sequelize.col(`Category.id`)],
        include: [{
          model: this._PostCategory,
          as: Alias.POST_CATEGORIES,
          attributes: []
        }]
      });

      return categories.map((it) => it.get());
    } else {
      return this._Category.findAll({raw: true});
    }
    //return this._Category.findAll({ raw: true });
  }

  async findOne(categoryId) {
    return this._Category.findByPk(categoryId);
  }

  async findAllArticlesById(categoryId) {
    const options = {
      order: [[`createdAt`, `DESC`]],
      where: [
        {
          CategoryId: categoryId,
        },
      ],
      group: [Sequelize.col(`CategoryId`), `createdAt`, `updatedAt`, `PostId`],
      include: [
        {
          model: this._Category,
          as: Alias.CATEGORIES,
          where: {
            id: categoryId,
          },
        },
      ],
    };
    // options.order = [[`createdAt`, `DESC`]];

    return this._PostCategory.findAll(options);
  }
};
