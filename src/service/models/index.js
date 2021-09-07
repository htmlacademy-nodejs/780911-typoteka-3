"use strict";

const Sequelize = require(`sequelize`);

const sequelize = new Sequelize(`library`, `academy`, `123456`, {
  host: `localhost`,
  dialect: `postgres`,
});

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

  Post.belongsTo(Author, {
    foreignKey: `authorId`,
    as: Aliase.AUTHORS,
  });

  Post.belongsToMany(Category, {
    through: PostCategory,
    foreignKey: `categoryId`,
    as: Aliase.CATEGORIES,
  });

  Category.belongsToMany(Post, {
    through: PostCategory,
    foreignKey: `postId`,
    as: Aliase.POSTS,
  });

  Comment.belongsTo(Author, {
    foreignKey: `authorId`,
    as: Aliase.AUTHORS,
  });

  Comment.belongsTo(Post, {
    foreignKey: `postId`,
    as: Aliase.POSTS,
  });

  return { Category, Comment, Post, PostCategory };
};

module.exports = define;

