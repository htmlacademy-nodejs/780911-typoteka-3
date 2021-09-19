"use strict";

const defineCategory = require(`./category`);
const defineAuthor = require(`./author`);
const definePost = require(`./post`);
const defineComment = require(`./comment`);
const definePostCategory = require(`./postCategory`);
const Alias = require(`./alias`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Author = defineAuthor(sequelize);
  const Post = definePost(sequelize);
  const Comment = defineComment(sequelize);
  const PostCategory = definePostCategory(sequelize);

  Post.hasOne(Author, {
    foreignKey: `author_id`,
  });

  Comment.belongsTo(Author, {
    foreignKey: `author_id`,
  });

  Comment.belongsTo(Post, {
    foreignKey: `post_id`,
  });

  Post.belongsToMany(Category, {
    through: PostCategory,
    foreignKey: `category_id`,
  });

  Category.belongsToMany(Post, {
    through: PostCategory,
    foreignKey: `post_id`,
  });

  return { Category, Comment, Post, PostCategory };
};

module.exports = define;
