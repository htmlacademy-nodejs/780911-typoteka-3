"use strict";

const { Router } = require(`express`);
const commentsRouter = new Router();
const { pageTitles } = require("../../constants");
const pageTitle = pageTitles.default;
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

commentsRouter.get(
  `/`,
  wrap(async (req, res) => {
    const articles = await api.getPosts({ withComments: false });
    res.render(`my-comments`, {
      articles,
      pageTitle,
      moment: require("moment"),
    });
  })
);

module.exports = commentsRouter;
