'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const myComments = require(`./my-comments`);
const myArticles = require(`./my-articles`);
myRouter.use(`/`, myArticles);
myRouter.use(`/comments`, myComments);


module.exports = myRouter;


