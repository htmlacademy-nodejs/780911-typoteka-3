'use strict';

const {Router} = require(`express`);
const loginRouter = new Router();
const pageTitle = `Типотека`;

loginRouter.get(`/`, (req, res) => res.render(`registration`, {pageTitle}));

module.exports = loginRouter;
