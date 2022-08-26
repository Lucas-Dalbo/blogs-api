const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const JWT = require('../auth/JWT');

const userRoute = express.Router();

userRoute.post('/login', userMiddleware.loginValidation, userController.login);
userRoute.post('/user', userMiddleware.createValidation, userController.create);

// userRoute.use(JWT.validate);

userRoute.get('/user', JWT.validate, userController.findAll);

module.exports = userRoute;
