"use strict";

const { Router } = require(`express`);
const searchRouter = new Router();
const axios = require(`axios`);
const { formatDateForPug } = require("../../utils");
const pageTitle = `Типотека`;

searchRouter.get(`/`, (req, res) => {
  const { search: searchValue } = req.query;
  if (searchValue) {
    axios
      .get(encodeURI(`http://localhost:3000/api/search?query=${searchValue}`), {
        timeout: 1000,
      })
      .then((response) => {
        const data = response.data;
        data.forEach((item) => {
          item.formattedDate = formatDateForPug(item.createdDate);
        });
        res.render(`search-2`, { searchValue, articles: data, pageTitle });
      })
      .catch((err) => {
        res.render(`search-3`, { searchValue, pageTitle });
      });
  } else {
    res.render(`search-1`, { pageTitle });
  }
});

module.exports = searchRouter;
