"use strict";

module.exports = class CommentService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._Post = sequelize.models.Post;
  }

  async create(post_id, comment) {
    return await this._Comment.create({
      post_id,
      ...comment,
    });
  }

  async findAll(post_id) {
    return await this._Comment.findAll({
      where: { post_id },
      raw: true,
    });
  }

  async findOne(id, post_id) {
    return await this._Comment.findOne({
      where: {
        id,
        post_id,
      },
    });
  }

  async drop(post_id, commentId) {
    const post = await this._Post.findOne({
      where: {
        id: post_id,
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
