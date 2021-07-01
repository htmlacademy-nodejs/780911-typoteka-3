"use strict";
const axios = require("axios");
const URL_ARTICLES = `http://localhost:3000/api/articles/`;
const ArticleKeys = [`title`, `announce`, `fullText`, `category`];
const articleExist = (req, res, next) => {
  axios.get(URL_ARTICLES, {timeout: 1000})
    .then((response) => {
      const comments = response.data.find(item => {
        if (item.id === req.params.articleId) {
          return item;
        }
      });
      if (!comments) {
        res.status(404);
        res.render(`404`);
      } else {
        next();
      }
    })
};

// const articleValidator = (req, res, next) => {
//   const newArticle = req.body;
//   newArticle.category = ``;
//   delete newArticle.image;
//   const keys = Object.keys(newArticle);
//   const keysExists = ArticleKeys.every((key) => keys.includes(key));
//
//   if (!keysExists) {
//     console.log('No keys!');
//     next(new Error('Wrong value in the field'));
//   } else {
//     console.log('keys are ok!');
//     next();
//   }
// };


module.exports = {
  articleExist,
};
