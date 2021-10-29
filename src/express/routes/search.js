"use strict";

const { Router } = require(`express`);
const searchRouter = new Router();
const { pageTitles } = require("../../constants");
const pageTitle = pageTitles.default;
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

searchRouter.get(
  `/`,
  wrap(async (req, res) => {
    const { search: searchValue } = req.query;
    if (searchValue) {
      try {
        const result = await api.search(searchValue);
        res.render(`search-2`, { searchValue, articles: result, pageTitle });
      } catch (error) {
        res.render(`search-3`, { searchValue, pageTitle });
      }
    } else {
      res.render(`search-1`, { pageTitle });
    }
  })
);

module.exports = searchRouter;
