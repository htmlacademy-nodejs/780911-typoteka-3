"use strict";

const axios = require(`axios`);
const { URL_LIST, pageTitle } = require(`../../helper`);
const { Router } = require(`express`);
const articlesByCategory = new Router();

articlesByCategory.get(`/:id`, (req, res) => {
  axios
    .get(`${URL_LIST.ARTICLES_BY_CATEGORY}/${req.params.id}`, {
      params: { withComments: true },
    })
    .then((response) => {
      // console.log(
      //   "GOT from back",
      //   response.data.otherCategories
      // );
      res.render(`publications-by-category`, {
        category: response.data.category,
        otherCategories: response.data.otherCategories,
        articles: response.data.posts,
        pageTitle,
      });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle });
    });
});

module.exports = articlesByCategory;
