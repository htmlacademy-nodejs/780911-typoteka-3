"use strict";
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const getRandomDateOfLastThreeMonths = () => {
  const start = new Date(
    new Date(new Date().setMonth(new Date().getMonth() - 3))
  );
  const end = new Date();
  const startHour = 0;
  const endHour = 24;
  const date = new Date(+start + Math.random() * (end - start));
  const hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return (
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [
      someArray[randomPosition],
      someArray[i],
    ];
  }

  return someArray;
};

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
  generatePublications,
  readContent,
  getRandomInt,
  getRandomDateOfLastThreeMonths,
};
