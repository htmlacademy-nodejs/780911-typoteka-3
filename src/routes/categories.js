'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) => res.send(`/categories`));

module.exports = categoriesRouter;
