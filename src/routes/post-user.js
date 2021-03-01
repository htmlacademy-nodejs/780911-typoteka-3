'use strict';

const {Router} = require(`express`);
const postUserRouter = new Router();

postUserRouter.get(`/`, (req, res) => res.render(`post-user`));

module.exports = postUserRouter;
