"use strict";

// TODO:  create CategoryService file
const {Router} = require(`express`);
const post = require(`./post-routes`);
const category = require(`./category-routes`);
const {
  PostService,
  CommentService,
  CategoryService
} = require(`../data-service`);
const {getSequelize} = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();
const sequelize = getSequelize();

console.log('src/service/api/index.js');
defineModels(sequelize);

(() => {
  post(app, new PostService(sequelize), new CommentService(sequelize));
  category(app, new CategoryService(sequelize));
})();

module.exports = app;

