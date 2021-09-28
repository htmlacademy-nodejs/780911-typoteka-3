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

  Post.hasOne(Author, {
    foreignKey: `author_id`,
  });

  Post.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `post_id`, onDelete: `cascade`});

  Comment.belongsTo(Author, {
    foreignKey: `author_id`,
  });

  Author.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `author_id`});

  Comment.belongsTo(Post, {
    foreignKey: `post_id`,
  });

  Post.belongsToMany(Category, {
    through: PostCategory,
    foreignKey: `category_id`,
    as: Alias.CATEGORIES,
  });

  Category.belongsToMany(Post, {
    through: PostCategory,
    foreignKey: `post_id`,
    as: Alias.POSTS,
  });
  Category.hasMany(PostCategory, { as: Alias.POST_CATEGORIES });

  return { Post, Category, Comment, PostCategory };
};

module.exports = define;
