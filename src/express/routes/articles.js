"use strict";

const { Router } = require(`express`);
const articlesRouter = new Router();
const articleAdd = require(`./article-add`);
const articleEdit = require(`./article-edit`);
const articlesByCategory = require(`./articles-by-category`);
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

articlesRouter.use(`/add`, articleAdd);
articlesRouter.use(`/edit`, articleEdit);
articlesRouter.use(`/category`, articlesByCategory);

articlesRouter.get(
  `/:id`,
  wrap(async (req, res) => {
    const { id } = req.params;
    const article = await api.getPostById({ id, withComments: true });
    res.render(`post-user`, { article });
  })
);

module.exports = articlesRouter;
