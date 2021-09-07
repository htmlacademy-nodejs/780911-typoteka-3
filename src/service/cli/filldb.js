"use strict";
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const { generatePublications, readContentTxt } = require("../../utils");
const { sequelize } = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);
const { getLogger } = require(`./server/logger`);
const logger = getLogger();

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const TITLES = `./data/titles.txt`;
const ANNOUNCE = `./data/sentences.txt`;
const CATEGORIES = `./data/categories.txt`;
const COMMENTS = `./data/comments.txt`;

module.exports = {
  name: "--filldb",
  async run(args) {
    const [count] = args;
    const countVal = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await readContentTxt(TITLES);
    const categories = await readContentTxt(CATEGORIES);
    const sentences = await readContentTxt(ANNOUNCE);
    const comments = await readContentTxt(COMMENTS);

    // console.log('content', content);
    // try {
    //   await fs.writeFile(FILE_NAME, content);
    //   console.log(chalk.green(`Operation success. File created.`));
    // } catch (error) {
    //   console.error(chalk.red(`Can't write data to file...`));
    // }

    try {
      // console.log(`Trying to connect to database...`);
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      // console.log(`An error occurred: ${err.message}`);
      process.exit(1);
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
      const postModel = await Post.create(post, { include: [Aliase.COMMENTS] });
      await postModel.addCategories(post.categories);
    });
    await Promise.all(postPromises);
  },
};
