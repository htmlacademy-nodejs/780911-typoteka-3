'use strict';

const {Router} = require(`express`);
const commentsRoute = new Router();
const axios = require("axios");
const URL_ARTICLES = `http://localhost:3000/api/articles/`;
const {formatDateForPug} = require("../utils");

commentsRoute.get(`/`, (req, res) => {

  axios.get(URL_ARTICLES, {timeout: 1000})
    .then((response) => {

      const data = response.data;
      data.forEach(item => {
        item.formattedDate = formatDateForPug(item.createdDate);
      })
      res.render(`admin-comments`, {
        articles: response.data
      });
    })
    .catch((err) => {
      res.render(`404`);
    })
});


module.exports = commentsRoute;
