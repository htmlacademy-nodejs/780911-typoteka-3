"use strict";

const axios = require(`axios`);
const { URL_LIST, pageTitle } = require(`../../helper`);
const { Router } = require(`express`);
const { POSTS_PER_PAGE } = require(`../../constants`);
const articlesByCategory = new Router();
const api = require(`../api`).getAPI();

articlesByCategory.get(`/:id`, async (req, res) => {
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

  //// console.log("posts!", data);
  //res.render(`404`, { pageTitle: "hohoho" });

  res.render(`publications-by-category`, {
    category: category,
    otherCategories: otherCategories,
    articles: posts,
    pageTitle,
    page,
    totalPages,
  });
  // axios
  //   .get(`${URL_LIST.ARTICLES_BY_CATEGORY}/${req.params.id}`, {
  //     params: { withComments: true },
  //   })
  //   .then((response) => {
  //     res.render(`publications-by-category`, {
  //       category: response.data.category,
  //       otherCategories: response.data.otherCategories,
  //       articles: response.data.posts,
  //       pageTitle,
  //     });
  //   })
  //   .catch((err) => {
  //     res.render(`404`, { pageTitle });
  //   });
});

module.exports = articlesByCategory;
