"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../http-code`);
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();

module.exports = (app, CategoryService) => {
  const router = new Router();

  app.use(`/category`, router);

  router.get(`/`, async (req, res) => {
    const { withCount } = req.query;
    const categories = await CategoryService.findAll(withCount);

    res.status(HttpCode.OK).json(categories);
  });

  // TODO: add validator to POST
  router.post(`/`, async (req, res) => {
    const category = await CategoryService.create(req.body);

    res.status(HttpCode.POST_OK).json(category);
  });

  router.put(`/:categoryId`, jsonParser, async (req, res) => {
    const { categoryId } = req.params;

    const category = await CategoryService.findOne(categoryId);

    if (!category) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the category with id ${categoryId} is not found`);
    }

    const updated = await CategoryService.update({
      id: categoryId,
      category: req.body,
    });

    return res.status(HttpCode.OK).json(updated);
  });

  router.delete(`/:categoryId`, jsonParser, async (req, res) => {
    const { categoryId } = req.params;

    const category = await CategoryService.findOne(categoryId);

    if (!category) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the category with id ${categoryId} is not found`);
    }

    const deleted = await CategoryService.drop(categoryId);

    if (!deleted) {
      return res.status(HttpCode.FORBIDDEN).send(`Forbidden`);
    }

    return res.status(HttpCode.OK).json(deleted);
  });
};
