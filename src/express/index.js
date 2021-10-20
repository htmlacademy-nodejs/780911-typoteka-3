"use strict";
const { formatDateForPug } = require(`../utils`);
const express = require(`express`);
const path = require(`path`);
const axios = require(`axios`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `./public`;
const UPLOAD_DIR = `upload`;
const { URL_LIST } = require("../helper");
const api = require(`./api`).getAPI();
const login = require(`./routes/login`);
const search = require(`./routes/search`);
const usersPost = require(`./routes/post-user`);
const my = require(`./routes/my`);
const articles = require(`./routes/articles`);
const publicationsByCategory = require(`./routes/publications-by-category`);
const categories = require(`./routes/categories`);
const { OFFERS_PER_PAGE } = require("../constants");

const pageTitle = `Типотека`;

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `./templates`));

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.use(`/login`, login);
app.use(`/search`, search);
app.use(`/post`, usersPost);
app.use(`/my`, my);
app.use(`/publications-by-category`, publicationsByCategory);
app.use(`/articles`, articles);
app.use(`/categories`, categories);

app.get(`/`, async (req, res) => {
  let { page = 1 } = req.query;
  page = +page;
  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const [ current , categories] = await Promise.all([
    api.getPosts({ limit, offset, withComments: true }),
    api.getCategories({ withCount: true }),
  ]);

  const totalPages = Math.ceil(current.current.count / OFFERS_PER_PAGE);
  //TODO: find out why posts are stored in offers: articles.current.offers
// TODO: why do I have so many current in fetched object
  // console.log('posts list', current);
  // console.log('current.count', current.count);
  // console.log('totalPages', totalPages);
  res.render(`main`, {
    articles: current.current.offers,
    pageTitle,
    categories,
    page,
    totalPages,
  });
});

app.use(function (req, res) {
  res.status(404);
  res.render(`404`, { pageTitle });
});

if (app.get("env") === "development") {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render(`500`, {
      message: err.message,
      error: err,
      pageTitle,
    });
  });
}

app.listen(DEFAULT_PORT, () =>
  console.log(`Сервер front-end запущен на порту: ${DEFAULT_PORT}`)
);
