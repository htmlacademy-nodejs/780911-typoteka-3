'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const adminAddNewPostEmpty = require(`./admin-add-new-post-empty`);
const articlesEditArticleId = require(`./articles-edit-articleId`)
offersRouter.use(`/add`, adminAddNewPostEmpty);
offersRouter.use(`/edit`, articlesEditArticleId);

module.exports = offersRouter;
