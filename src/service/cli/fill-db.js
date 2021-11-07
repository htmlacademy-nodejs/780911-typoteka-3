"use strict";

const {
  generatePublications,
  readContentTxt,
  generateComments,
} = require("../../utils");
const { getSequelize } = require(`../lib/sequelize`);
const { getLogger } = require(`./server/logger`);
const logger = getLogger();
const { ExitCode, mockAuthors } = require(`../../constants`);
const initDatabase = require(`../lib/init-db`);
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
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(ExitCode.error);
    }

    logger.info(`Connection to database established`);

    const posts = generatePublications(
      countVal,
      titles,
      categories,
      sentences,
      comments
    );

    const commentsList = generateComments(countVal, comments, mockAuthors.length, countVal - 1);

    return initDatabase(sequelize, {
      categories,
      posts,
      comments: commentsList,
      authors: mockAuthors,
    });
  },
};
