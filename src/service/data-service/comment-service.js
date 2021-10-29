"use strict";

module.exports = class CommentService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._Post = sequelize.models.Post;
  }

  async create(postId, comment) {
    return await this._Comment.create({
      postId,
      ...comment,
    });
  }

  async findAll(postId) {
    return await this._Comment.findAll({
      where: { postId },
      raw: true,
    });
  }

  async findOne(id, postId) {
    return await this._Comment.findOne({
      where: {
        id,
        postId,
      },
    });
  }

  async drop(postId, commentId) {
    const post = await this._Post.findOne({
      where: {
        id: postId,
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
