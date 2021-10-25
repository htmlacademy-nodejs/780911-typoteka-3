"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../http-code`);


module.exports = (app, SearchService) => {
  const router = new Router();

  app.use(`/search`, router);

  router.get(`/`, async (req, res) => {
    // console.log(`src/service/api/search-routes.js file`);

    const {query = ``} = req.query;
    if (!query) {
      res.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    const data = await SearchService.findAll(query);
    const status = data.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(status)
      .json(data);

  });

};
