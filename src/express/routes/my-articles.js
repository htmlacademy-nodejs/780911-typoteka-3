"use strict";

const { Router } = require(`express`);
const myArticlesRouter = new Router();
const { pageTitles } = require("../../constants");
const pageTitle = pageTitles.default;
const api = require(`../api`).getAPI();

myArticlesRouter.get(`/`, async (req, res) => {
  const articles = await api.getPosts({ withComments: false });
  res.render(`my-articles`, { articles, pageTitle });
});

module.exports = myArticlesRouter;
