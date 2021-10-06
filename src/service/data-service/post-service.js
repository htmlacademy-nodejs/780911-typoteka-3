"use strict";
/* Important!!! Categories to post are named as categories, not category, cuz they are stored in DB as categories*/
const Alias = require("../models/alias");

module.exports = class PostService {
  constructor(sequelize) {
    this._Post = sequelize.models.Post;
    // this._PostCategory = sequelize.models.PostCategory;
    this._Comment = sequelize.models.Comment;
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
    // console.log("findAll in post-service ", posts);
    return posts.map((post) => post.get());
  }

  findOne({ articleId }) {
    console.log("id: ", articleId);
    const options = {
      include: [Alias.CATEGORIES],
      where: [
        {
          id: articleId,
        },
      ],
    };

    options.order = [[`createdAt`, `DESC`]];

    return this._Post.findOne(options);
  }

  async update({ id, post }) {
    console.log("PostService", id, post);
    const affectedRows = await this._Post.update(post, {
      where: {
        id,
      },
    });

    console.log("affectedRows", affectedRows);

    const updatedOffer = await this._Post.findOne({
      where: {
        id,
      },
    });
    console.log("updatedOffer", updatedOffer);

    await updatedOffer.setCategories(post.categories);

    return !!affectedRows;
  }

  async drop({ id }) {
    const deletedRows = await this._Post.destroy({
      where: { id },
    });
    return Boolean(!!deletedRows);
  }
};
