"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../http-code`);

module.exports = (app, CategoryService) => {
  const router = new Router();

  app.use(`/category`, router);

  router.get(`/`, async (req, res) => {
    const {withCount} = req.query;
    const categories = await CategoryService.findAll(withCount);

    res.status(HttpCode.OK).json(categories);
  });

};
