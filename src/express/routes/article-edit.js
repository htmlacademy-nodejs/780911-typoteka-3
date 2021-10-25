"use strict";

const { Router } = require(`express`);
const articleEditRouter = new Router();
const axios = require(`axios`);
const { upload } = require(`../../helper`);
const { pageTitles } = require("../../constants");
const type = pageTitles.editPost;
const editArticleValidator = require(`../middlewares/edit-article-frontend-validator`);
const bodyParser = require(`body-parser`);
const api = require(`../api`).getAPI();

articleEditRouter.get(`/:id`, async (req, res) => {
  const article = await api.getPostById({
    id: req.params.id,
    withComments: false,
  });
  res.render(`article-add`, {
    article: article,
    moment: require("moment"),
    type,
    pageTitle: type,
    categories: article.categories,
    action: `/articles/edit/${req.params.id}`,
  });
});

articleEditRouter.post(
  `/:id`,
  upload.single(`avatar`),
  editArticleValidator,
  async (req, res) => {
    try {
      await api.putPost({ id: req.params.id, data: req.body });

      res.redirect(`/my`);
    } catch (err) {
      // console.log("caught err", err);
      res.render(`article-add`, {
        article: req.body,
        moment: require("moment"),
        type,
        pageTitle: type,
        categories: req.body.categories,
        action: `/articles/edit/${req.params.id}`,
      });
    }
  }
);
module.exports = articleEditRouter;
