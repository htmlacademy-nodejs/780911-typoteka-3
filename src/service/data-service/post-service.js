"use strict";

const Alias = require("../models/alias");

module.exports = class PostService {
  constructor(sequelize) {
    // this._sequelize = sequelize;
    this._Post = sequelize.models.Post;
    this._PostCategory = sequelize.models.PostCategory;
  }

  async create(post) {
    const newPost = await this._Post.create(post);
    await newPost.addCategories(post.categories);
    return newPost.get();
  }

  async findAll() {
    const options = {
      include: [Alias.CATEGORIES],
      order: [
        [`createdAt`, `DESC`]
      ],
    };

    options.order = [[`createdAt`, `DESC`]];

    const posts = await this._Post.findAll(options);
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
    const [updatedRows] = await this._Post.update(post, {
      where: { id },
    });

    // TODO: uncomment this lines after the whole func is working and enable updates for categories of post
    // await this._PostCategory.destroy({
    //   where: {post_id: id}
    // });

    // const updatedArticle = await this._Post.findByPk(id);
    // console.log('updatedArticle', updatedArticle);
    // await updatedArticle.addCategories([...post.categories]);
    // return Boolean(updatedRows);

    const updatedArticle = await this._Post.findOne({
      where: {
        id,
      },
    });

    await updatedArticle.setCategories(offer.categories);

    return !!affectedRows;
  }

  async drop({ id }) {
    const deletedRows = await this._Post.destroy({
      where: { id },
    });
    return Boolean(!!deletedRows);
  }
};
