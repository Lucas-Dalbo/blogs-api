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

module.exports = blogPostRoute;
