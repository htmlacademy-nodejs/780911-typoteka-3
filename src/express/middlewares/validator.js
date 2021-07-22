"use strict";
const axios = require("axios");
const {returnMatchingStringsArray} = require("../../utils");
const {returnCategory, URL_LIST} = require("../../helper");
const ArticleKeys = [`title`, `announce`, `fullText`, `category`];
const pageTitle = `Типотека`;

const articleExist = (req, res, next) => {
  axios.get(URL_LIST.ARTICLES, { timeout: 1000 }).then((response) => {
    const comments = response.data.find((item) => {
      if (item.id === req.params.articleId) {
        return item;
      }
    });
    if (!comments) {
      res.status(404);
      res.render(`404`, { pageTitle });
    } else {
      next();
    }
  });
};

const articleRequirements = {
  title: {
    min: 1, // 30
    minErrorText: `Обязательное поле. Минимум 30 символов`,
    max: 250,
    maxErrorText: `Максимум 250 символов`,
  },
  date: {
    min: 10,
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

const articleValidator = async (req, res, next) => {
  const article = req.body;
  article.category = returnMatchingStringsArray(await returnCategory(), Object.keys(article));
  delete article.image;
  const errorsList = {};

  if (article.title.length < articleRequirements.title.min) {
    errorsList.title = articleRequirements.title.minErrorText;
  }
  if (article.title.length >= articleRequirements.title.max) {
    errorsList.title = articleRequirements.title.maxErrorText;
  }
  if (article.date.length > articleRequirements.date.min) {
    errorsList.date = articleRequirements.date.minErrorText;
  }
  if (article.announce.length < articleRequirements.announce.min) {
    errorsList.announce = articleRequirements.announce.minErrorText;
  }
  if (article.announce.length >= articleRequirements.announce.max) {
    errorsList.announce = articleRequirements.announce.maxErrorText;
  }
  if (article.fullText.length >= articleRequirements.fullText.max) {
    errorsList.fullText = articleRequirements.fullText.maxErrorText;
  }

  res.locals.errorList = errorsList;
  next();
};

module.exports = {
  articleExist,
  articleValidator,
};
