"use strict";

const express = require(`express`);
const path = require(`path`);
const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `./public`;
const UPLOAD_DIR = `upload`;
const api = require(`./api`).getAPI();
const loginRoute = require(`./routes/login`);
const searchRoute = require(`./routes/search`);
const usersPostRoute = require(`./routes/post-user`);
const myRoute = require(`./routes/my`);
const articlesRoute = require(`./routes/articles`);
const categoriesRoute = require(`./routes/categories`);
const { POSTS_PER_PAGE, pageTitles } = require(`../constants`);

const pageTitle = pageTitles.default;

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `./templates`));

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.use(`/login`, loginRoute);
app.use(`/search`, searchRoute);
app.use(`/post`, usersPostRoute);
app.use(`/my`, myRoute);
app.use(`/articles`, articlesRoute);
app.use(`/categories`, categoriesRoute);

app.get(`/`, async (req, res) => {
  let { page = 1 } = req.query;
  page = +page;
  const limit = POSTS_PER_PAGE;
  const offset = (page - 1) * POSTS_PER_PAGE;

  const [{ count, posts }, categories] = await Promise.all([
    api.getPosts({ limit, offset, withComments: true }),
    api.getCategories({ withCount: true }),
  ]);

  const totalPages = Math.ceil(count / POSTS_PER_PAGE);
  res.render(`main`, {
    articles: posts,
    pageTitle,
    categories,
    page,
    totalPages,
    moment: require("moment"),
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
