"use strict";

const { Router } = require(`express`);
const { pageTitles } = require("../../constants");
const postUserRouter = new Router();
const pageTitle = pageTitles.default;

postUserRouter.get(`/`, (req, res) => res.render(`post-user`, { pageTitle }));

module.exports = postUserRouter;
