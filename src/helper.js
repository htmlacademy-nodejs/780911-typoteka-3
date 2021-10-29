"use strict";

const URL_LIST = {
  ARTICLES: `http://localhost:3000/api/articles/`,
  ARTICLES_BY_CATEGORY: `http://localhost:3000/api/articles/category`,
  CATEGORIES: `http://localhost:3000/api/category/`,
  DEFAULT: `http://localhost:3000/api/`,
};

const multer = require("multer");
const { nanoid } = require(`nanoid`);
const UPLOAD_DIR = `../upload/img/`;
const path = require(`path`);
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);


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
  URL_LIST,
  upload,
};
