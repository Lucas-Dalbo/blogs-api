const Joi = require('joi');

const createValidation = (req, _res, next) => {
  const { name } = req.body;

  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate({ name });

  if (error) return next(error);

  next();
};

module.exports = { createValidation };
