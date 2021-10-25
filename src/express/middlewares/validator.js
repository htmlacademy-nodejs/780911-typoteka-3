"use strict";
const axios = require(`axios`);
const { returnMatchingStringsArray } = require("../../utils");
const { returnCategory, URL_LIST } = require(`../../helper`);
const { pageTitles } = require("../../constants");

const pageTitle = pageTitles.newPost;

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
  full_text: {
    max: 1000,
    maxErrorText: `Максимум 1000 символов`,
  },
};

// const articleValidator = async (req, res, next) => {
//   const article = req.body;
//   // console.log("data got in validator", article);
//   article.category = returnMatchingStringsArray(
//     await returnCategory(),
//     Object.keys(article)
//   );
//   delete article.image;
//   const errorsList = {};
//
//   if (article.title.length < articleRequirements.title.min) {
//     errorsList.title = articleRequirements.title.minErrorText;
//   }
//   if (article.title.length >= articleRequirements.title.max) {
//     errorsList.title = articleRequirements.title.maxErrorText;
//   }
//   if (!article.created_date) {
//     errorsList.date = articleRequirements.date.minErrorText;
//   }
//   if (article.announce.length < articleRequirements.announce.min) {
//     errorsList.announce = articleRequirements.announce.minErrorText;
//   }
//   // if (article.announce.length >= articleRequirements.announce.max) {
//   //   errorsList.announce = articleRequirements.announce.maxErrorText;
//   // }
//   if (article.full_text.length >= articleRequirements.full_text.max) {
//     errorsList.full_text = articleRequirements.full_text.maxErrorText;
//   }
//
//   // console.log("errorsList", errorsList);
//   res.locals.errorList = errorsList;
//   if (Object.keys(errorsList).length) {
//     // console.log(`Catch some errors ${Object.keys(errorsList).join()}`);
//   }
//   next();
// };

const articlePutValidator = (req, res, next) => {
  // console.log("articlePutValidator 1");
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  // console.log("articlePutValidator req.params", req.params);
  // console.log("articlePutValidator req.body", req.body);
  const keysExists = ArticleKeys.some((key) => keys.includes(key));
  // console.log("Got article in validator on back", newArticle);
  if (!keysExists) {
    // console.log(
      "article DOES NOT pass validation on back",
      Object.keys(newArticle).join()
    );
    sendResponse(res, HttpCode.BAD_REQUEST, `no such fields in offer`);
  } else {
    // console.log("article passes validation on back");
    next();
  }
};

module.exports = {
  articleExist,
  // articleValidator,
  articlePutValidator,
};
