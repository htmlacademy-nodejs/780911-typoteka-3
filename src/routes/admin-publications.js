'use strict';

const {Router} = require(`express`);
const adminPublicationsRoute = new Router();

adminPublicationsRoute.get(`/`, (req, res) => res.render(`admin-publications`));

module.exports = adminPublicationsRoute;
