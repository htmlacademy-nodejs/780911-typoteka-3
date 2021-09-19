"use strict";

// const Sequelize = require(`sequelize`);

const defineCategory = require(`./category`);
const defineAuthor = require(`./author`);
const definePost = require(`./post`);
const defineComment = require(`./comment`);
const definePostCategory = require(`./postCategory`);
const Aliase = require(`./aliase`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Author = defineAuthor(sequelize);
  const Post = definePost(sequelize);
  const Comment = defineComment(sequelize);
  const PostCategory = definePostCategory(sequelize);

  Post.hasOne(Author, {
    foreignKey: `author_id`,
    as: Aliase.AUTHORS,
  });

  // Comment.belongsTo(Author, {
  //   foreignKey: `author_id`,
  //   as: Aliase.AUTHORS,
  // });
  //
  // Comment.belongsTo(Post, {
  //   foreignKey: `post_id`,
  //   as: Aliase.AUTHORS,
  // });
  //
  // Post.belongsToMany(Category, {
  //   through: PostCategory,
  //   foreignKey: `category_id`,
  //   as: Aliase.CATEGORIES,
  // });
  //
  // Category.belongsToMany(Post, {
  //   through: PostCategory,
  //   foreignKey: `post_id`,
  //   as: Aliase.POSTS,
  // });

  return { Category, Comment, Post, PostCategory };
};

module.exports = define;
