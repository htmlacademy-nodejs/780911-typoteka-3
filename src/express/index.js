"use strict";
const {formatDateForPug} = require(`../utils`);
const express = require(`express`);
const path = require(`path`);
const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `./public`;
const loginRoute = require(`../routes/login`);
const searchRoute = require(`../routes/search`)
const postUserRoute = require(`../routes/post-user`);
const publicationsByCategoryRoute = require(`../routes/publications-by-category`);
const adminCommentsRoute = require(`../routes/admin-comments`);
const adminPublicationsRoute = require(`../routes/admin-publications`);
const adminAddNewPostEmptyRoute = require(`../routes/admin-add-new-post-empty`);
const adminCategoriesRoute = require(`../routes/admin-categories`);
const app = express();
const axios = require(`axios`);
const URL_ARTICLES = `http://localhost:3000/api/articles/`;

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `./templates`));

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));


app.use(`/login`, loginRoute);
app.use(`/search`, searchRoute);
app.use(`/post`, postUserRoute);
app.use(`/publications-by-category`, publicationsByCategoryRoute);
app.use(`/admin-comments`, adminCommentsRoute);
app.use(`/admin-publications`, adminPublicationsRoute);
app.use(`/admin-add-new-post-empty`, adminAddNewPostEmptyRoute);
app.use(`/admin-categories`, adminCategoriesRoute);
app.get(`/`, (req, res) => {

  axios.get(URL_ARTICLES, {timeout: 1000})
    .then((response) => {
      const data = response.data;
      data.forEach(item => {
        item.formattedDate = formatDateForPug(item.createdDate);
      })
      res.render(`main`, {articles: data});
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    })

});

app.use(function (req, res) {
  res.status(404);
  res.render(`404`);
});

// this was commented before
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('500', {
      message: err.message,
      error: err
    });
  });
}


app.listen(DEFAULT_PORT, () =>
  console.log(`Сервер front-end запущен на порту: ${DEFAULT_PORT}`)
);

