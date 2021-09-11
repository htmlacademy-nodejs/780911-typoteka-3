"use strict";
const FS_OK = 0;
const fsp = require(`fs`).promises;
const { nanoid } = require(`nanoid`);
const { getLogger } = require(`./service/cli/server/logger`);
const moment = require("moment");
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

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(...items.splice(getRandomInt(0, items.length - 1), 1));
  }
  return result;
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
      comments: createCommentsList(comments, getRandomInt(1, count)),
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(1, getRandomInt(0, sentences.length - 1))
        .join(` `),
      createdDate: moment().format("L"),
      categories: shuffle(categories).slice(
        0,
        getRandomInt(1, categories.length)
      ),
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

const formatDateForPug = (dateIn) => {
  console.log("formatDateForPug", dateIn);
  try {
    const date = dateIn.split(" ")[0].replace(/-/g, ".");
    const dateHours = dateIn.split(" ")[1].split(":")[0];
    const dateMinutes = dateIn.split(" ")[1].split(":")[1];
    return `${date}, ${dateHours}:${dateMinutes}`;
  } catch (err) {
    log.error(err);
    return false;
  }
};

const returnMatchingStringsArray = function (arr1, arr2) {
  const ret = [];
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr2.indexOf(arr1[i]) > -1) {
      ret.push(arr1[i]);
    }
  }
  return ret;
};

const findReplaceItemById = (arr, replacer) => {
  const foundIndex = arr.findIndex((item) => item.id == replacer.id);
  arr[foundIndex] = replacer;
  return arr;
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
  formatDateForPug,
  returnMatchingStringsArray,
  findReplaceItemById,
};
