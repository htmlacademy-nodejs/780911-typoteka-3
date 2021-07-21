"use strict";

const { Router } = require(`express`);
const commentsRouter = new Router();
const axios = require("axios");
const {URL_LIST} = require("../helper");
const { formatDateForPug } = require("../utils");
const pageTitle = `Типотека`;

commentsRouter.get(`/`, (req, res) => {
  axios
    .get(URL_LIST.ARTICLES, { timeout: 1000 })
    .then((response) => {
      const data = response.data;
      data.forEach((item) => {
        item.formattedDate = formatDateForPug(item.createdDate);
      });
      res.render(`my-comments`, {
        articles: response.data,
        pageTitle,
      });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle });
    });
});

module.exports = commentsRouter;
