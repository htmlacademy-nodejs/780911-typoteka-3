'use strict';

const {Router} = require(`express`);
const commentsRoute = new Router();
const axios = require("axios");
const URL_ARTICLES = `http://localhost:3000/api/articles/`;
const {formatDateForPug} = require("../utils");
const {articleExist} = require(`../express/middlewares/validator`);
commentsRoute.get(`/:articleId`, articleExist, (req, res) => {
// res.context - find data
  axios.get(URL_ARTICLES, {timeout: 1000})
    .then((response) => {
      const article = response.data.find(item => {
        if (item.id === req.params.articleId) {
          item.formattedDate = formatDateForPug(item.createdDate);
          return item;
        }
      });
      res.render(`admin-comments`, {
        comments: article.comments,
        title: article.title,
        createdDate: article.createdDate,
        formattedDate: article.formattedDate
      });
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    })
});

module.exports = commentsRoute;
