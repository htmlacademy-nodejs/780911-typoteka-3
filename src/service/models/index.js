"use strict";

const defineCategory = require(`./category`);
const defineAuthor = require(`./author`);
const definePost = require(`./post`);
const defineComment = require(`./comment`);
const definePostCategory = require(`./post-сategory`);
const Alias = require(`./alias`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Author = defineAuthor(sequelize);
  const Post = definePost(sequelize);
  const Comment = defineComment(sequelize);
  const PostCategory = definePostCategory(sequelize);

  Post.hasMany(Comment, {
    as: Alias.COMMENTS,
    foreignKey: `postId`,
    onDelete: `cascade`,
  });
  Comment.belongsTo(Post, {
    foreignKey: `postId`,
  });

  Post.belongsToMany(Category, {
    through: PostCategory,
    as: Alias.CATEGORIES,
  });
  Category.belongsToMany(Post, {
    through: PostCategory,
    as: Alias.POSTS,
  });
  Category.hasMany(PostCategory, { as: Alias.POST_CATEGORIES });

  Author.hasMany(Post, { as: Alias.POSTS, foreignKey: `authorId` });
  Post.belongsTo(Author, {
    as: Alias.AUTHORS,
    foreignKey: `authorId`,
  });

  Author.hasMany(Comment, { as: Alias.COMMENTS, foreignKey: `authorId` });
  Comment.belongsTo(Author, {
    as: Alias.AUTHORS,
    foreignKey: `authorId`,
  });

  return { Post, Category, Comment, PostCategory, Author };
};

module.exports = define;
