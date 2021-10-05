"use strict";

const { Router } = require(`express`);
const postUserRouter = new Router();
const pageTitle = `Типотека`;

postUserRouter.get(`/`, (req, res) => res.render(`post-user`, { pageTitle }));

module.exports = postUserRouter;
