"use strict";

const { Router } = require(`express`);
const commentsRouter = new Router();
const axios = require(`axios`);
const {URL_LIST} = require(`../../helper`);
const { formatDateForPug } = require("../../utils");
const pageTitle = `Типотека`;

commentsRouter.get(`/`, (req, res) => {
  axios
    .get(URL_LIST.ARTICLES, { params: { withComments: true } })
    .then((response) => {
      // const data = response.data;
      // data.forEach((item) => {
      //   item.formattedDate = formatDateForPug(item.createdDate);
      // });
      const { current: postsData } = response.data;
      res.render(`my-comments`, {
        articles: postsData,
        pageTitle,
      });
    })
    .catch((err) => {
      res.render(`404`, { pageTitle });
    });
});

module.exports = commentsRouter;
