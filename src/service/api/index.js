"use strict";

const { Router } = require(`express`);
const post = require(`./post-routes`);
const category = require(`./category-routes`);
const search = require(`./search-routes`);

const {
  PostService,
  CommentService,
  CategoryService,
  SearchService,
} = require(`../data-service`);
const { getSequelize } = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();
const sequelize = getSequelize();

// console.log("src/service/api/index.js");
defineModels(sequelize);

(() => {
  post(app, new PostService(sequelize), new CommentService(sequelize), new CategoryService(sequelize));
  category(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
})();

module.exports = app;
