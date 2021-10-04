"use strict";
// TODO:  create CategoryService file
const { Router } = require(`express`);
const { HttpCode } = require(`../../HttpCode`);

module.exports = (app, CategoryService) => {
  const router = new Router();

  app.use(`/category`, router);

  router.get(`/`, async (req, res) => {
    console.log(`src/service/api/category-routes.js file`);
    const categories = await CategoryService.findAll();

    res.status(HttpCode.OK).json(categories);
  });

  router.get(`/:categoryId`, async (req, res) => {
    const { categoryId } = req.params;

    const category = await CategoryService.findOne(categoryId);

    res.status(HttpCode.OK).json({
      category,
    });
  });
};
