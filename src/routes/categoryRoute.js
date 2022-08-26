const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryMiddleware = require('../middlewares/categoryMiddleware');
const JWT = require('../auth/JWT');

const categoryRoute = express.Router();

categoryRoute.post('/categories',
  JWT.validate,
  categoryMiddleware.createValidation,
  categoryController.create);

module.exports = categoryRoute;
