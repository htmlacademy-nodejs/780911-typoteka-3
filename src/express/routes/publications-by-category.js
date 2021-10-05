"use strict";

const { Router } = require(`express`);
const articlesByCategoryRoute = new Router();
const pageTitle = `Типотека`;

articlesByCategoryRoute.get(`/`, (req, res) =>
  res.render(`publications-by-category`, pageTitle)
);

module.exports = articlesByCategoryRoute;
