"use strict";

const Alias = require("../models/alias");
const Sequelize = require(`sequelize`);

module.exports = class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._PostCategory = sequelize.models.PostCategory;
    this._Post = sequelize.models.Post;
    this._Comment = sequelize.models.Comment;
  }

  async findAll(withCount) {
    if (withCount) {
      const categories = await this._Category.findAll({
        attributes: [
          `id`,
          `name`,
          [Sequelize.fn(`COUNT`, Sequelize.col(`CategoryId`)), `count`],
        ],
        group: [Sequelize.col(`Category.id`)],
        include: [
          {
            model: this._PostCategory,
            as: Alias.POST_CATEGORIES,
            attributes: [],
          },
        ],
      });

      return categories.map((it) => it.get());
    } else {
      return this._Category.findAll({ raw: true });
    }
  }

  async findPage({ id, limit, offset }) {
    // console.log("findPage in category-service", id, limit, offset);
    const posts = await this._PostCategory.findAll({
      attributes: [`PostId`],
      where: {
        CategoryId: id,
      },
      raw: true,
    });

    // // console.log("posts", posts);

    const postsId = posts.map((postIdItem) => postIdItem.PostId);

    const { count, rows } = await this._Post.findAndCountAll({
      limit,
      offset,
      include: [
        Alias.CATEGORIES,
        {
          model: this._Comment,
          as: Alias.COMMENTS,
        },
      ],
      order: [[`createdAt`, `DESC`]],
      where: {
        id: postsId,
      },
      distinct: true,
    });
    // // console.log("count", count, "rows", rows);
    return { count, posts: rows };
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
    // console.log("category-service findAllArticlesById");
    return this._PostCategory.findAll(options);
  }
};
