const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

const userRoute = express.Router();

userRoute.post('/login', userMiddleware.loginValidation, userController.login);
userRoute.post('/user', userMiddleware.createValidation, userController.create);

module.exports = userRoute;
