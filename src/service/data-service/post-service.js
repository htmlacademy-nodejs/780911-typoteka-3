"use strict";

const Sequelize = require(`sequelize`);

module.exports = class PostService{
  constructor(sequelize) {
    this._sequelize = sequelize;
    this._Post=sequelize.models.Post;
    this._PostCategory = sequelize.models.PostCategory;
  }

  async create(post) {
    const newPost = await this._Post.create(post);
    await newPost.addCategories(post.categories);
    return newPost.get();
  }

  async findAll() {
    const posts = await this._Post.findAll();
    return posts.map((post) => post.get());
  }

  getOne(id) {
    return this._Post.findByPk(id);
  }

  async update(id, post) {
    const [updatedRows] = await this._Post.update(post, {
      where: {id}
    });

    await this._PostCategory.destroy({
      where: {post_id: id}
    });

    const updatedArticle = await this._Post.findByPk(id);
    await updatedArticle.addCategories([...post.categories]);
    return Boolean(updatedRows);
  }

  async delete(id) {
    const deletedRows = await this._Post.destroy({
      where: {id}
    });
    return Boolean(!!deletedRows);
  }
}
