'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => res.render(`search-1`));

module.exports = searchRouter;
