"use strict";

const { Router } = require(`express`);
const myArticlesRouter = new Router();
const { pageTitles } = require("../../constants");
const pageTitle = pageTitles.default;
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

myArticlesRouter.get(
  `/`,
  wrap(async (req, res) => {
    const articles = await api.getPosts({ withComments: false });
    res.render(`my-articles`, {
      articles,
      moment: require("moment"),
      pageTitle,
    });
  })
);

module.exports = myArticlesRouter;
