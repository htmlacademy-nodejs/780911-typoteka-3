"use strict";

const { Router } = require(`express`);
const articleEditRouter = new Router();
const { upload } = require(`../../helper`);
const { pageTitles } = require("../../constants");
const type = pageTitles.editPost;
const editArticleValidator = require(`../middlewares/edit-article-frontend-validator`);
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

articleEditRouter.get(
  `/:id`,
  wrap(async (req, res) => {
    const article = await api.getPostById({
      id: req.params.id,
      withComments: false,
    });
    res.render(`article-add`, {
      article,
      moment: require("moment"),
      type,
      pageTitle: type,
      categories: article.categories,
      action: `/articles/edit/${req.params.id}`,
    });
  })
);

articleEditRouter.post(
  `/:id`,
  upload.single(`avatar`),
  editArticleValidator,
  wrap(async (req, res) => {
    try {
      await api.putPost({ id: req.params.id, data: req.body });

      res.redirect(`/my`);
    } catch (err) {
      res.render(`article-add`, {
        article: req.body,
        moment: require("moment"),
        type,
        pageTitle: type,
        categories: req.body.categories,
        action: `/articles/edit/${req.params.id}`,
      });
    }
  })
);
module.exports = articleEditRouter;
