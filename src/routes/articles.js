'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/:${req.params.id}`));
offersRouter.get(`/add`, (req, res) => res.send(`/articles/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:${req.params.id}`));
offersRouter.get(`/:id`, (req, res) => res.send(`/articles/${req.params.id}`));


module.exports = offersRouter;
