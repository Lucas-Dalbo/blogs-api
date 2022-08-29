const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const JWT = require('../auth/JWT');

const userRoute = express.Router();

userRoute.post('/login', userMiddleware.loginValidation, userController.login);
userRoute.post('/user', userMiddleware.createValidation, userController.create);

// **Trava teste**
// userRoute.use(JWT.validate); 

userRoute.get('/user', JWT.validate, userController.findAll);
userRoute.get('/user/:id', JWT.validate, userController.findById);
userRoute.delete('/user/me', JWT.validate, userController.remove);

module.exports = userRoute;
