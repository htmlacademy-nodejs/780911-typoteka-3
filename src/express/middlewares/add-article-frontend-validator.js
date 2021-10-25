"use strict";

const moment = require("moment");
//TODO: add categories validator to function, now I send just empty array
//TODO: add author to the post, now it's a 1 by default

const formatTimeFromFrontEnd = (date) => {
  // console.log("formatted date", moment(date, `DD.MM.YYYY`).format());
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
  full_text: {
    max: 1000,
    maxErrorText: `Максимум 1000 символов`,
  },
};

module.exports = async (req, res, next) => {
  const article = req.body;

  article.created_date = formatTimeFromFrontEnd(article.created_date);
  article.createdAt = article.updatedAt = article.created_date;
  article.author_id = 1;
  // TODO: add image loading and pass it to backend
  article.avatar = null;
  // console.log("data got in validator", article);
  const errorsList = {};

  if (article.title.length < articleRequirements.title.min) {
    errorsList.title = articleRequirements.title.minErrorText;
  }
  if (article.title.length >= articleRequirements.title.max) {
    errorsList.title = articleRequirements.title.maxErrorText;
  }
  if (!article.created_date) {
    errorsList.date = articleRequirements.date.minErrorText;
  }
  if (article.announce.length < articleRequirements.announce.min) {
    errorsList.announce = articleRequirements.announce.minErrorText;
  }
  // if (article.announce.length >= articleRequirements.announce.max) {
  //   errorsList.announce = articleRequirements.announce.maxErrorText;
  // }
  if (article.full_text.length >= articleRequirements.full_text.max) {
    errorsList.full_text = articleRequirements.full_text.maxErrorText;
  }

  // console.log("errorsList", errorsList);
  res.locals.errorList = errorsList;
  if (Object.keys(errorsList).length) {
    // console.log(`Catch some errors ${Object.keys(errorsList).join()}`);
  }
  next();
};
