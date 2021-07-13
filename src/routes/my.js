'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const adminCommentsRoute = require(`./admin-comments`);
const adminPublicationsRoute = require(`./admin-publications`);
myRouter.use(`/`, adminPublicationsRoute);
myRouter.use(`/comments`, adminCommentsRoute);


module.exports = myRouter;


