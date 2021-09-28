"use strict";

const { generatePublications, readContentTxt } = require("../../utils");
const { getSequelize } = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const { Alias } = require(`../models/alias`);
const { getLogger } = require(`./server/logger`);
const logger = getLogger();
const { ExitCode } = require(`../../constants`);
const DEFAULT_COUNT = 1;
const TITLES = `./data/titles.txt`;
const ANNOUNCE = `./data/sentences.txt`;
const CATEGORIES = `./data/categories.txt`;
const COMMENTS = `./data/comments.txt`;

module.exports = {
  name: "--filldb",
  async run(args) {
    const sequelize = getSequelize();
    const [count] = args;
    const countVal = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await readContentTxt(TITLES);
    const categories = await readContentTxt(CATEGORIES);
    const sentences = await readContentTxt(ANNOUNCE);
    const comments = await readContentTxt(COMMENTS);

    try {
      console.log(`Trying to connect to database...`);
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);
      logger.error(`An error occurred: ${err.message}`);
      process.exit(ExitCode.error);
    }

    logger.info(`Connection to database established`);
    console.log(`Connection to database established`);

    const { Post, Category } = defineModels(sequelize);

    await sequelize.sync({ force: true });

    const categoryModels = await Category.bulkCreate(
      categories.map((item) => ({ name: item }))
    );

    const generatedPosts = generatePublications(
      countVal,
      titles,
      categoryModels,
      sentences,
      comments
    );

    const postPromises = generatedPosts.map(async (post) => {
      // const postModel = await Post.create(post, { include: [Alias.COMMENTS] });
      const postModel = await Post.create(post);
      await postModel.addCategories(post.categories);
    });
    await Promise.all(postPromises);
  },
};
