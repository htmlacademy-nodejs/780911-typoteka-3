"use strict";
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const { generatePublications, readContentTxt } = require("../../utils");

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const TITLES = `./data/titles.txt`;
const ANNOUNCE = `./data/sentences.txt`;
const CATEGORIES = `./data/categories.txt`;
const COMMENTS = `./data/comments.txt`;


module.exports = {
  name: "--generate",
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await readContentTxt(TITLES);
    const categories = await readContentTxt(CATEGORIES);
    const sentences = await readContentTxt(ANNOUNCE);
    const comments = await readContentTxt(COMMENTS);
    const content = JSON.stringify(
      generatePublications(countOffer, titles, categories, sentences, comments)
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
