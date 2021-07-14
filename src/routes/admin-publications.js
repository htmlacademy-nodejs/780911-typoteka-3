'use strict';

const axios = require("axios");
const URL_ARTICLES = `http://localhost:3000/api/articles/`;
const {formatDateForPug} = require("../utils");
const {Router} = require(`express`);
const adminPublicationsRoute = new Router();

adminPublicationsRoute.get(`/`, (req, res) => {

  axios.get(URL_ARTICLES, {timeout: 1000})
    .then((response) => {
      const data = response.data;
      data.forEach(item => {
        item.formattedDate = formatDateForPug(item.createdDate);
      })
      res.render(`admin-publications`,  {articles: data})
    })
    .catch((err) => {
      res.render(`404`);
    })

});

module.exports = adminPublicationsRoute;
