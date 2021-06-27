'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const adminAddNewPostEmpty = require(`./admin-add-new-post-empty`);
offersRouter.use(`/add`, adminAddNewPostEmpty);


module.exports = offersRouter;
