"use strict";

const { Router } = require(`express`);
const searchRouter = new Router();
const axios = require("axios");
const {formatDateForPug} = require("../utils");

searchRouter.get(`/`, async (req, res) => {

  try {
    const { search: searchValue } = req.query;
    if (searchValue) {

      axios
        .get(
          encodeURI(`http://localhost:3000/api/search?query=${searchValue}`),
          {
            timeout: 1000,
          }
        )
        .then((response) => {
          const data = response.data;
          data.forEach(item => {
            item.formattedDate = formatDateForPug(item.createdDate);
          })
          res.render(`search-2`, { searchValue, articles: data });
        })
        .catch((err) => {
          res.render(`search-3`, { searchValue });
        });
    } else {
      res.render(`search-1`);
    }
  } catch (error) {
    res.render(`404`);
  }
});

module.exports = searchRouter;
