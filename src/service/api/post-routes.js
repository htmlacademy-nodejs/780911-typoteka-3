"use strict";
const { Router } = require(`express`);
const { HttpCode } = require(`../../HttpCode`);

module.exports = (app, offerService) => {
  const router = new Router();

  app.use(`/articles`, router);

};


// const { Router } = require(`express`);
// const { getLogger } = require(`../cli/server/logger`);
// const { HttpCode } = require(`../../HttpCode`);
// const {
//   sendResponse,
// } = require(`../../utils`);
// const log = getLogger();
// const postService = require(`../data-service/post-service`);
// const getSequelize = require(`../lib/sequelize`);
// // const { Post, Category } = defineModels(getSequelize);
// const defineModels = require(`../models`)
// module.exports = () => {
//
//   const router = new Router();
//
//   router.get(`/articles`, async (req, res) => {
//     const postsList = new postService(defineModels(getSequelize));
//
//     try {
//       res.json(postsList.getAll());
//       log.info(`End request GET: /articles with status code ${res.statusCode}`);
//     } catch (e) {
//       sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
//       log.error(`End request GET: /articles with error ${res.statusCode}`);
//     }
//   });
//
//   return router;
// }
