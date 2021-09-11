"use strict";

const {Router} = require(`express`);
const categoriesRouter = new Router();
const pageTitle = `Типотека`;

categoriesRouter.get(`/`, (req, res) => res.render(`categories`, {pageTitle}));

module.exports = categoriesRouter;
