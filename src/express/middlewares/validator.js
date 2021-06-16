"use strict";
const axios = require("axios");
const URL_ARTICLES = `http://localhost:3000/api/articles/`;

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

module.exports = {
  articleExist,
};
