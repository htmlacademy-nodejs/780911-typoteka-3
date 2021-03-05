'use strict';

const {Router} = require(`express`);
const articlesByCategoryRoute = new Router();

articlesByCategoryRoute.get(`/`, (req, res) => res.render(`publications-by-category`));

module.exports = articlesByCategoryRoute;
