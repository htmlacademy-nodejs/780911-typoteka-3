'use strict';

const {Router} = require(`express`);
const adminAddNewPostEmptyRoute = new Router();

adminAddNewPostEmptyRoute.get(`/`, (req, res) => res.render(`admin-add-new-post-empty`));

module.exports = adminAddNewPostEmptyRoute;
