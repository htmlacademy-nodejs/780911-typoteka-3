"use strict";


const {Router} = require(`express`);
const post = require(`./post-routes`);
const {
  PostService,
} = require(`../data-service`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();
console.log('11111');
defineModels(sequelize);

(() => {
  post(app, new PostService(sequelize));
})();

module.exports = app;

