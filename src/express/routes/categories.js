"use strict";

const { Router } = require(`express`);
const { pageTitles } = require("../../constants");
const { URL_LIST } = require("../../helper");
const axios = require("axios");
const categoriesRouter = new Router();
const pageTitle = pageTitles.default;

categoriesRouter.get(`/`, (req, res) =>
  axios
    .get(`${URL_LIST.CATEGORIES}`)
    .then((response) => {
      const categories = response.data;
      console.log("categories", categories);
      res.render(`categories`, { pageTitle, categories });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle });
    })
);

module.exports = categoriesRouter;
