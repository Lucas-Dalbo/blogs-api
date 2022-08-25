const { Op } = require('sequelize');
const models = require('../database/models');
const CustomError = require('../helpers/customError');

const { User } = models;

const login = async ({ email, password }) => {
  const result = await User.findOne(
    { where: { [Op.and]: [{ email }, { password }] } },
  );

  if (!result) throw new CustomError(400, 'Invalid fields');

  return result;
};

module.exports = { login };
