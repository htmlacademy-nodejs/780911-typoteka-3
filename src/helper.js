"use strict";

const URL_LIST = {
  ARTICLES: `http://localhost:3000/api/articles/`,
  CATEGORIES: `http://localhost:3000/api/categories/`,
};

const moment = require("moment");
const axios = require("axios");
const multer = require("multer");
const { nanoid } = require(`nanoid`);
const UPLOAD_DIR = `../upload/img/`;
const path = require(`path`);
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const returnCategory = async () => {
  const category = axios
    .get(URL_LIST.CATEGORIES, { timeout: 1000 })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {
      return [];
    });
  return category;
};

const returnCurrentDate = (date = new Date()) => {
  return moment(date).format(`DD.MM.YYYY`);
};


const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});
const upload = multer({ storage });


module.exports = {
  returnCategory,
  returnCurrentDate,
  URL_LIST,
  upload
};
