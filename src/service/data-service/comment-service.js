"use strict";

module.exports = class CommentService {
  constructor(sequelize) {
    // this._sequelize = sequelize;
    this._Comment = sequelize.models.Comment;
    this._Post = sequelize.models.Post;
  }

  async create(articleId, comment) {
    return await this._Comment.create({
      articleId,
      ...comment,
    });
  }

  async findAll(articleId) {
    return await this._Comment.findAll({
      where: { articleId },
      raw: true,
    });
  }

  async findOne(id, articleId) {
    return await this._Comment.findOne({
      where: {
        id,
        articleId,
      },
    });
  }

  async drop(articleId, commentId) {
    const post = await this._Post.findOne({
      where: {
        id: articleId,
      },
    });

    if (!post) {
      return !!post;
    }

    const deletedRows = await this._Comment.destroy({
      where: {
        id: commentId,
      },
    });

    return !!deletedRows;
  }
};
