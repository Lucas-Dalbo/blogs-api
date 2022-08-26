const Joi = require('joi');
const CustomError = require('../helpers/customError');

const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) throw new CustomError(400, 'Some required fields are missing');

  next();
};

const createValidation = (req, _res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  }).validate({ displayName, email, password, image });

  if (error) return next(error);

  next();
};

module.exports = { loginValidation, createValidation };
