"use strict";

const { Router } = require(`express`);
const articleEditRouter = new Router();
const axios = require("axios");
const emptyPost = {
  title: ``,
  announce: ``,
  fullText: ``,
  date: `21.04.2019`,
};

const type = `Редактирование публикации`;

articleEditRouter.get(`/:articleId`, (req, res) => {
  axios
    .get(`http://localhost:3000/api/articles/${req.params.articleId}`, {
      timeout: 1000,
    })
    .then((response) => {
      const data = response.data;
      const fethedPost = {
        title: data.title,
        announce: data.announce,
        fullText: data.fullText,
        date: `21.04.2019`,
        category: data.category
      };
      res.render(`article-add`, {
        article: fethedPost,
        type,
        pageTitle: type,
        category: data.category,
      });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle: type });
    });
});

articleEditRouter.put(`/:articleId`, (req, res) => {
  axios
    .put(`http://localhost:3000/api/articles/${req.params.articleId}`, {
      timeout: 1000,
    })
    .then((response) => {
      const data = response.data;
      const fethedPost = {
        title: data.title,
        announce: data.announce,
        fullText: data.fullText,
        date: `21.04.2019`,
        category: data.category,
      };
      res.render(`article-add`, {
        article: fethedPost,
        type,
        pageTitle: type,
        category: data.category,
      });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle: type });
    });
});
module.exports = articleEditRouter;
