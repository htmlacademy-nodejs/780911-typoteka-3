"use strict";
const axios = require(`axios`);
const { URL_LIST } = require(`../../helper`);
const {sendResponse} = require("../../utils");
const ArticleKeys = [`created_date`,`title`, `announce`, `full_text`, `categories`];


module.exports =  (req, res, next) => {
  console.log("articlePutValidator 1");
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  console.log("articlePutValidator req.params", req.params);
  console.log("articlePutValidator req.body", req.body);
  const keysExists = ArticleKeys.some((key) => keys.includes(key));
  console.log("Got article in validator on back", newArticle);
  if (!keysExists) {
    console.log(
      "article DOES NOT pass validation on back",
      Object.keys(newArticle).join()
    );
    sendResponse(res, HttpCode.BAD_REQUEST, `no such fields in offer`);
  } else {
    console.log("article passes validation on back");
    next();
  }
};

