const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const blogPostMiddleware = require('../middlewares/blogPostMiddleware');
const JWT = require('../auth/JWT');

const blogPostRoute = express.Router();

blogPostRoute.post(
  '/post',
  JWT.validate,
  blogPostMiddleware.postValidation,
  blogPostController.create,
);

blogPostRoute.get('/post', JWT.validate, blogPostController.findAll);
blogPostRoute.get('/post/search', JWT.validate, blogPostController.getByQuery);
blogPostRoute.get('/post/:id', JWT.validate, blogPostController.findPost);

blogPostRoute.put(
  '/post/:id',
  JWT.validate,
  blogPostMiddleware.updateValidation,
  blogPostController.update,
);

blogPostRoute.delete('/post/:id', JWT.validate, blogPostController.remove);

module.exports = blogPostRoute;
