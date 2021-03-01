'use strict';

const {Router} = require(`express`);
const adminCategoriesRoute = new Router();

adminCategoriesRoute.get(`/`, (req, res) => res.render(`admin-categories`));

module.exports = adminCategoriesRoute;
