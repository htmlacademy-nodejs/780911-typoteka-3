"use strict";

const { Router } = require(`express`);
const articleEditRouter = new Router();
const axios = require("axios");
const { returnCurrentDate, upload } = require("../helper");
const type = `Редактирование публикации`;
const moment = require("moment");
const { articleValidator } = require("../express/middlewares/validator");
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.urlencoded({ extended: true });

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

articleEditRouter.post(`/:articleId`,  jsonParser,
  upload.single(`avatar`), articleValidator, (req, res) => {

  // console.log('PUT req body', req.body);
  axios
    .put(`http://localhost:3000/api/articles/${req.params.articleId}`, req.body)
    .then((response) => {
      const data = response.data;
      // console.log('PUT req body in req to back', req.body);
      const fetchedPost = {
        title: data.title,
        announce: data.announce,
        fullText: data.fullText,
        date: returnCurrentDate(
          moment(data.createdDate, "DD-MM-YYYY hh:mm:ss")
        ),
        category: data.category,
      };

      if (Object.keys(res.locals.errorList).length) {
        res.render(`article-add`, {
          article: fetchedPost,
          type,
          pageTitle: type,
          category: data.category,
          action: `/articles/edit/${req.params.articleId}`
        });
      } else {
        res.redirect(`/my`);
      }
    })
    .catch((err) => {

      res.render(`404`, { pageTitle: type });
    });
});
module.exports = articleEditRouter;
