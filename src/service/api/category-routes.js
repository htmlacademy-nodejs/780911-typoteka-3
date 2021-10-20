"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../HttpCode`);

module.exports = (app, CategoryService) => {
  const router = new Router();

  app.use(`/category`, router);

  router.get(`/`, async (req, res) => {
    console.log(`src/service/api/category-routes.js file`);
    const {withCount} = req.query;
    const categories = await CategoryService.findAll(withCount);

    res.status(HttpCode.OK).json(categories);
  });

};
