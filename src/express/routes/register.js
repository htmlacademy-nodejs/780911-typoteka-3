"use strict";

const { Router } = require(`express`);
const {pageTitles} = require("../../constants");
const registerRouter = new Router();
const pageTitle = pageTitles.default;

registerRouter.get(`/`, (req, res) => res.send(`/register`, { pageTitle }));

module.exports = registerRouter;
