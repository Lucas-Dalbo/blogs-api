const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

const userRoute = express.Router();

userRoute.post('/login', userMiddleware.loginValidation, userController.login);

userRoute.use(errorMiddleware);

module.exports = userRoute;
