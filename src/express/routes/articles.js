"use strict";

const { Router } = require(`express`);
const articlesRouter = new Router();
const axios = require(`axios`);
const articleAdd = require(`./article-add`);
const articleEdit = require(`./article-edit`);
const articlesByCategory = require(`./articles-by-category`);
const { URL_LIST } = require("../../helper");
const pageTitle = `Типотека`;

articlesRouter.use(`/add`, articleAdd);
articlesRouter.use(`/edit`, articleEdit);
articlesRouter.use(`/category`, articlesByCategory);

articlesRouter.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  axios
    .get(`${URL_LIST.ARTICLES}/${id}`, { params: { withComments: true } })
    .then((response) => {
      const article = response.data;
      console.log("Data on FrontEnd on articles/:id", article);
      res.render(`post-user`, { article });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle });
    });
});

module.exports = articlesRouter;
