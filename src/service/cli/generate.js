"use strict";
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  generatePublications,
  readContent
} = require("../../utils");

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const TITLES = `./data/titles.txt`;
const ANNOUNCE = `./data/sentences.txt`;
const CATEGORIES = `./data/categories.txt`;

module.exports = {
  name: "--generate",
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await readContent(TITLES);
    const categories = await readContent(CATEGORIES);
    const sentences = await readContent(ANNOUNCE);
    const content = JSON.stringify(
      generatePublications(countOffer, titles, categories, sentences)
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
