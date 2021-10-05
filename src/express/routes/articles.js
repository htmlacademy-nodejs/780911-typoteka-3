"use strict";

const {Router} = require(`express`);
const articlesRouter = new Router();
const articleAdd = require(`./article-add`);
const articleEdit = require(`./article-edit`)
articlesRouter.use(`/add`, articleAdd);
articlesRouter.use(`/edit`, articleEdit);

module.exports = articlesRouter;
