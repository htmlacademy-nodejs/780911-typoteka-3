"use strict";

const defineModels = require(`../models`);
// const { authorsSQLQuery } = require("../../constants");
const Alias = require("../models/alias");
// const { getRandomInt, generateComments } = require("../../utils");

module.exports = async (
  sequelize,
  { categories, posts, comments, authors }
) => {
  const { Category, Post, Comment, Author } = defineModels(sequelize);
  await sequelize.sync({ force: true });

  const categoryModels = await Category.bulkCreate(
    categories.map((item) => ({ name: item }))
  );

  const categoryIdByName = categoryModels.reduce(
    (acc, next) => ({
      [next.name]: next.id,
      ...acc,
    }),
    {}
  );

  const postPromises = posts.map(async (post) => {
    const postModel = await Post.create(post, {
      include: [
        {
          model: Comment,
          as: Alias.COMMENTS,
          include: [Alias.AUTHORS],
        },
      ],
    });
    await postModel.addCategories(
      post.categories.map((name) => categoryIdByName[name])
    );
  });
  await Promise.all(postPromises);

  await Author.bulkCreate(authors);
  await Comment.bulkCreate(comments);
};
