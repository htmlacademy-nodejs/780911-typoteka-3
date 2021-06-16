'use strict';

const {Router} = require(`express`);
const adminAddNewPostEmptyRoute = new Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.urlencoded({ extended: true });
adminAddNewPostEmptyRoute.get(`/`, (req, res) => {
  res.render(`admin-add-new-post-empty`)
});

adminAddNewPostEmptyRoute.post(`/`, jsonParser, async (req, res) => {
  const newArticle = req.body;
  console.log('newArticle', newArticle);
  res.render(`admin-add-new-post-empty`);
});

module.exports = adminAddNewPostEmptyRoute;
