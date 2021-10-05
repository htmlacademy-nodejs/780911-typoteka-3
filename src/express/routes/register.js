"use strict";

const { Router } = require(`express`);
const registerRouter = new Router();
const pageTitle = `Типотека`;

registerRouter.get(`/`, (req, res) => res.send(`/register`, { pageTitle }));

module.exports = registerRouter;
