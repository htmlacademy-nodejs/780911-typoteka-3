"use strict";


const {Router} = require(`express`);
const post = require(`./post-routes`);
const {
  PostService,
  CommentService
} = require(`../data-service`);
const {getSequelize} = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();
const sequelize = getSequelize();

console.log('src/service/api/index.js');
defineModels(sequelize);

(() => {
  post(app, new PostService(sequelize), new CommentService(sequelize));
})();

module.exports = app;

