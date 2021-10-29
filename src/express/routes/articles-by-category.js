"use strict";

const { pageTitle } = require(`../../helper`);
const { Router } = require(`express`);
const { POSTS_PER_PAGE } = require(`../../constants`);
const articlesByCategory = new Router();
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

articlesByCategory.get(
  `/:id`,
  wrap(async (req, res) => {
    let { page = 1 } = req.query;
    page = +page;
    const limit = POSTS_PER_PAGE;
    const offset = (page - 1) * POSTS_PER_PAGE;

    const {
      category,
      otherCategories,
      posts,
      count,
    } = await api.getPostsByCategoryId({
      id: req.params.id,
      limit,
      offset,
      withComments: true,
    });

    const totalPages = Math.ceil(count / POSTS_PER_PAGE);

    res.render(`publications-by-category`, {
      category,
      otherCategories,
      articles: posts,
      pageTitle,
      page,
      totalPages,
    });
  })
);

module.exports = articlesByCategory;
