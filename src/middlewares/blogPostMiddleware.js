const Joi = require('joi');
const CustomError = require('../helpers/customError');

const postValidation = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate({ title, content, categoryIds });

  if (error) throw new CustomError(400, 'Some required fields are missing');

  next();
};

module.exports = { postValidation };