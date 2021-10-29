"use strict";
/* Important!!! Categories to post are named as categories, not category, cuz they are stored in DB as categories*/
const Alias = require("../models/alias");

module.exports = class PostService {
  constructor(sequelize) {
    this._Post = sequelize.models.Post;
    // this._PostCategory = sequelize.models.PostCategory;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async create(post) {
    const newPost = await this._Post.create(post);
    await newPost.addCategories(post.categories);
    return newPost.get();
  }

  async findAll({ withComments }) {
    const options = {
      include: [Alias.CATEGORIES],
      order: [[`createdAt`, `DESC`]],
    };

    if (withComments) {
      options.include.push({
        model: this._Comment,
        as: Alias.COMMENTS,
      });
    }

    options.order = [[`createdAt`, `DESC`]];

    const posts = await this._Post.findAll(options);

    return posts.map((post) => post.get());
  }

  async findPage({ limit, offset, withComments }) {
    const options = {
      limit,
      offset,
      include: [Alias.CATEGORIES],
      order: [[`createdAt`, `DESC`]],
      distinct: true,
    };

    if (withComments) {
      options.include.push({
        model: this._Comment,
        as: Alias.COMMENTS,
      });
    }
    const { count, rows } = await this._Post.findAndCountAll(options);
    return { count, posts: rows };
  }
  // TODO: remove this method findByCategory
  async findByCategory({ id, limit, offset }) {
    const options = {
      include: [
        {
          model: this._Category,
          as: Alias.CATEGORIES,
          where: {
            id,
          },
        },
      ],
    };

    if (limit || offset) {
      const { count, rows } = await this._Post.findAndCountAll({
        limit,
        offset,
        options,
        distinct: true,
      });

      return {
        count,
        articles: rows,
      };
    }

    const result = await this._Post.findAll({ options });
    const posts = result.map((it) => it.get());

    return {
      count: posts.length,
      posts,
    };
  }

  findOne({ articleId, withComments }) {
    const options = {
      include: [Alias.CATEGORIES],
      where: [
        {
          id: articleId,
        },
      ],
    };

    if (withComments) {
      options.include.push({
        model: this._Comment,
        as: Alias.COMMENTS,
        include: [Alias.AUTHORS],
      });
    }

    options.order = [[`createdAt`, `DESC`]];

    return this._Post.findOne(options);
  }

  async update({ id, post }) {
    const affectedRows = await this._Post.update(post, {
      where: {
        id,
      },
    });

    const updatedOffer = await this._Post.findOne({
      where: {
        id,
      },
    });

    await updatedOffer.setCategories(post.categories);

    return !!affectedRows;
  }

  async drop({ id }) {
    const deletedRows = await this._Post.destroy({
      where: { id },
    });
    return Boolean(deletedRows);
  }
};
