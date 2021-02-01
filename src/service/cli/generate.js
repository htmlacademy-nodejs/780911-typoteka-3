"use strict";
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomDateOfLastThreeMonths,
  getRandomInt,
  shuffle,
} = require("../../utils");

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const TITLES = `./data/titles.txt`;
const ANNOUNCE = `./data/sentences.txt`;
const CATEGORIES = `./data/categories.txt`;

const readContent = async (filePath) => {

  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(/\n|\r/g).filter((item) => {
      return item.length > 0;
    });
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generatePublications = (count, titles, categories, sentences) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(1, getRandomInt(0, sentences.length - 1))
        .join(` `),
      createdDate: getRandomDateOfLastThreeMonths(),
      category: [categories[getRandomInt(0, categories.length - 1)]],
    }));

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
      await fs.writeFile(FILE_NAME, JSON.stringify(content));
      console.log(chalk.green(`Operation success. File created.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
