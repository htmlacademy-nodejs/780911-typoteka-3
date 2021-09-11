"use strict";

const axios = require("axios");
const {URL_LIST} = require("../helper");
const {formatDateForPug} = require("../utils");
const {Router} = require(`express`);
const myArticlesRouter = new Router();
const pageTitle = `Типотека`;

myArticlesRouter.get(`/`, (req, res) => {

  axios.get(URL_LIST.ARTICLES, {timeout: 1000})
    .then((response) => {
      const data = response.data;
      data.forEach(item => {
        item.formattedDate = formatDateForPug(item.createdDate);
      })
      res.render(`my-articles`,  {articles: data, pageTitle})
    })
    .catch((err) => {
      res.render(`404`, {pageTitle});
    })

});

module.exports = myArticlesRouter;
