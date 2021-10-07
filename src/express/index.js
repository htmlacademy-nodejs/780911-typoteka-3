"use strict";
const { formatDateForPug } = require(`../utils`);
const express = require(`express`);
const path = require(`path`);
const axios = require(`axios`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `./public`;
const UPLOAD_DIR = `upload`;
const { URL_LIST } = require("../helper");

const login = require(`./routes/login`);
const search = require(`./routes/search`);
const usersPost = require(`./routes/post-user`);
const my = require(`./routes/my`);
const articles = require(`./routes/articles`);
const publicationsByCategory = require(`./routes/publications-by-category`);
const categories = require(`./routes/categories`);

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

app.get(`/`, (req, res) => {
  axios
    .get(URL_LIST.ARTICLES, { params: { withComments: true } })
    .then((response) => {
      const { current: postsData } = response.data;
      res.render(`main`, { articles: postsData, pageTitle });
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
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
