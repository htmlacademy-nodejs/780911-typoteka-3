"use strict";

const { Router } = require(`express`);
const { pageTitles } = require("../../constants");
const pageTitle = pageTitles.default;
const categoriesRouter = new Router();
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

categoriesRouter.get(
  `/`,
  wrap(async (req, res) => {
    const categories = await api.getCategories({ withCount: false });
    res.render(`categories`, { pageTitle, categories });
  })
);

module.exports = categoriesRouter;
