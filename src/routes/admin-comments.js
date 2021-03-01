'use strict';

const {Router} = require(`express`);
const commentsRoute = new Router();

commentsRoute.get(`/`, (req, res) => res.render(`admin-comments`));

module.exports = commentsRoute;
