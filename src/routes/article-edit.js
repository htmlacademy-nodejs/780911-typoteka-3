"use strict";

const { Router } = require(`express`);
const articleEditRouter = new Router();
const axios = require("axios");
const { returnCurrentDate } = require("../helper");
const emptyPost = {
  title: ``,
  announce: ``,
  fullText: ``,
  date: returnCurrentDate(),
};
const type = `Редактирование публикации`;
const moment = require("moment");
const { articleValidator } = require("../express/middlewares/validator");

articleEditRouter.get(`/:articleId`, (req, res) => {
  axios
    .get(`http://localhost:3000/api/articles/${req.params.articleId}`, {
      timeout: 1000,
    })
    .then((response) => {
      const data = response.data;
      const fetchedPost = {
        title: data.title,
        announce: data.announce,
        fullText: data.fullText,
        date: returnCurrentDate(
          moment(data.createdDate, "DD-MM-YYYY hh:mm:ss")
        ),
        category: data.category,
      };
      res.render(`article-add`, {
        article: fetchedPost,
        type,
        pageTitle: type,
        category: data.category,
        action: `/articles/edit/${req.params.articleId}`
      });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle: type });
    });
});

articleEditRouter.put(`/:articleId`, articleValidator, (req, res) => {
  axios
    .put(`http://localhost:3000/api/articles/${req.params.articleId}`, {
      timeout: 1000,
    })
    .then((response) => {
      const data = response.data;
      const fetchedPost = {
        title: data.title,
        announce: data.announce,
        fullText: data.fullText,
        date: returnCurrentDate(
          moment(data.createdDate, "DD-MM-YYYY hh:mm:ss")
        ),
        category: data.category,
      };
      res.render(`article-add`, {
        article: fetchedPost,
        type,
        pageTitle: type,
        category: data.category,
        action: `/articles/edit/${req.params.articleId}`
      });
    })
    .catch((err) => {

      res.render(`404`, { pageTitle: type });
    });
});
module.exports = articleEditRouter;
