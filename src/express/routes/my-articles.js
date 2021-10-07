"use strict";

const axios = require(`axios`);
const {URL_LIST} = require(`../../helper`);
const {formatDateForPug} = require("../../utils");
const {Router} = require(`express`);
const myArticlesRouter = new Router();
const pageTitle = `Типотека`;

myArticlesRouter.get(`/`, (req, res) => {

  axios.get(URL_LIST.ARTICLES, { params: { withComments: false } })
    .then((response) => {
      const { current: postsData } = response.data;
      res.render(`my-articles`,  {articles: postsData, pageTitle})
    })
    .catch((err) => {
      res.render(`404`, {pageTitle});
    })

});

module.exports = myArticlesRouter;
