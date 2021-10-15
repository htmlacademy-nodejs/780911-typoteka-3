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
    foreignKey: `post_id`,
    onDelete: `cascade`,
  });
  Comment.belongsTo(Post, {
    foreignKey: `post_id`,
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

  Author.hasMany(Post, { as: Alias.POSTS, foreignKey: `author_id` });
  Post.belongsTo(Author, {
    as: Alias.AUTHORS,
    foreignKey: `author_id`,
  });

  Author.hasMany(Comment, { as: Alias.COMMENTS, foreignKey: `author_id` });
  Comment.belongsTo(Author, {
    as: Alias.AUTHORS,
    foreignKey: `author_id`,
  });

  return { Post, Category, Comment, PostCategory };
};

module.exports = define;
