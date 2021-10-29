"use strict";

const moment = require("moment");
// TODO: add categories validator to function, now I send just empty array
// TODO: add author to the post, now it's a 1 by default

const formatTimeFromFrontEnd = (date) => {
  return moment(date, `DD.MM.YYYY`).format();
};

const articleRequirements = {
  title: {
    min: 1, // 30
    minErrorText: `Обязательное поле. Минимум 30 символов`,
    max: 250,
    maxErrorText: `Максимум 250 символов`,
  },
  date: {
    minErrorText: `Обязательное поле`,
  },
  announce: {
    min: 1, // 30
    minErrorText: `Обязательное поле. Минимум 30 символов`,
    max: 250,
    maxErrorText: `Максимум 250 символов`,
  },
  fullText: {
    max: 1000,
    maxErrorText: `Максимум 1000 символов`,
  },
};

module.exports = async (req, res, next) => {
  const article = req.body;
  const {file} = req;

  article.createdDate = formatTimeFromFrontEnd(article.createdDate);
  article.createdAt = article.updatedAt = article.createdDate;
  article.authorId = 1;
  article.avatar =  file ? file.filename : ``;
  const errorsList = {};

  if (article.title.length < articleRequirements.title.min) {
    errorsList.title = articleRequirements.title.minErrorText;
  }
  if (article.title.length >= articleRequirements.title.max) {
    errorsList.title = articleRequirements.title.maxErrorText;
  }
  if (!article.createdDate) {
    errorsList.date = articleRequirements.date.minErrorText;
  }
  if (article.announce.length < articleRequirements.announce.min) {
    errorsList.announce = articleRequirements.announce.minErrorText;
  }
  // if (article.announce.length >= articleRequirements.announce.max) {
  //   errorsList.announce = articleRequirements.announce.maxErrorText;
  // }
  if (article.fullText.length >= articleRequirements.fullText.max) {
    errorsList.fullText = articleRequirements.fullText.maxErrorText;
  }

  res.locals.errorList = errorsList;
  if (Object.keys(errorsList).length) {
    console.log(`Catch some errors ${Object.keys(errorsList).join()}`);
  }
  next();
};
