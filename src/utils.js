"use strict";
const FS_OK = 0;
const fsp = require(`fs`).promises;
const { nanoid } = require(`nanoid`);
const {getLogger} = require(`./service/cli/server/logger`);
const log = getLogger();
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

const createComment = (text) => {
  return { id: nanoid(), text };
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

const readContentJSON = async (filePath) => {
  try {
    const content = await fsp.readFile(filePath, `utf8`);
    return JSON.parse(content);
  } catch (err) {
    console.error(`readContentJSON`, filePath, err);
    return [];
  }
};

const readContentTxt = async (filePath) => {
  try {
    const content = await fsp.readFile(filePath, `utf8`);
    return content.split(/\n|\r/g).filter((item) => {
      return item.length > 0;
    });
  } catch (err) {
    console.error(`readContentTxt`, filePath, err);
    return [];
  }
};

const createCommentsList = (arr, length) => {
  const commentsArr = [];

  for (let i = 0; i < length; i++) {
    commentsArr[i] = {
      id: nanoid(),
      text: arr[getRandomInt(1, arr.length - 1)],
    };
  }
  return commentsArr;
};

const returnItemByID = async (arr, id) => {
  const offer = arr.find((item) => {
    return item.id === id;
  });

  return offer;
};

const createArticle = (offer) => {
  return Object.assign({ id: nanoid(), comments: [] }, offer);
};

const generatePublications = (count, titles, categories, sentences, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(),
      comments: createCommentsList(comments, getRandomInt(1, count)),
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(1, getRandomInt(0, sentences.length - 1))
        .join(` `),
      createdDate: getRandomDateOfLastThreeMonths(),
      category: [categories[getRandomInt(0, categories.length - 1)]],
    }));

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const returnArticles = async (file) => {
  const errMessage = `The file on ${file} does not exist.`;
  return fsp
    .access(file, FS_OK)
    .then(async () => {
      const mockData = await readContentJSON(file);
      return mockData;
    })
    .catch(() => {
      log.error(errMessage);
      return false;
    });
};

const returnTitles = async (articlesList) => {
  try {
    return articlesList.map((item) => {
      return item.title;
    });
  } catch (err) {
    log.error(err);
    return false;
  }
};

module.exports = {
  sendResponse,
  generatePublications,
  readContentTxt,
  getRandomInt,
  getRandomDateOfLastThreeMonths,
  readContentJSON,
  returnItemByID,
  createCommentsList,
  createArticle,
  createComment,
  returnArticles,
  returnTitles,
};
