"use strict";

const { Router } = require(`express`);
const { getLogger } = require(`../cli/server/logger`);
const { HttpCode } = require(`../../HttpCode`);
const {
  sendResponse,
} = require(`../../utils`);
const log = getLogger();

module.exports = (postService) => {

  const router = new Router();

  router.get(`/articles`, async (req, res) => {
    const postsList = await postService.getAll()
    try {
      res.json(postsList);
      log.info(`End request GET: /articles with status code ${res.statusCode}`);
    } catch (e) {
      sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
      log.error(`End request GET: /articles with error ${res.statusCode}`);
    }
  });

  return router;
}
