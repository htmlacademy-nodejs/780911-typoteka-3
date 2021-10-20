"use strict";

const { Router } = require(`express`);
const articleEditRouter = new Router();
const axios = require(`axios`);
const { upload } = require(`../../helper`);
const { pageTitles } = require("../../constants");
const type = pageTitles.editPost;
const editArticleValidator = require(`../middlewares/edit-article-frontend-validator`);
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
        full_text: data.full_text,
        created_date: data.created_date,
        categories: data.categories,
      };

      res.render(`article-add`, {
        article: fetchedPost,
        type,
        pageTitle: type,
        categories: data.categories,
        action: `/articles/edit/${req.params.articleId}`,
      });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle: type });
    });
});

articleEditRouter.post(
  `/:articleId`,
  jsonParser,
  upload.single(`avatar`),
  editArticleValidator,
  (req, res) => {
    //console.log('PUT req body', req.body);
    axios
      .put(
        `http://localhost:3000/api/articles/${req.params.articleId}`,
        req.body
      )
      .then((response) => {
        const data = response.data;
        // console.log('PUT req body in req to back', req.body);
        const fetchedPost = {
          title: data.title,
          announce: data.announce,
          full_text: data.full_text,
          created_date: data.created_date,
          categories: data.categories,
        };

        console.log("edit post Frontend got", data);
        if (Object.keys(res.locals.errorList).length) {
          console.log('got some errors', res.locals.errorList);
          res.render(`article-add`, {
            article: fetchedPost,
            type,
            pageTitle: type,
            categories: data.categories,
            action: `/articles/edit/${req.params.articleId}`,
          });
        } else {
          res.redirect(`/my`);
        }
      })
      .catch((err) => {
        res.render(`404`, { pageTitle: type });
      });
  }
);
module.exports = articleEditRouter;
