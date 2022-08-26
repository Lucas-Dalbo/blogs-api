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

const create = async ({ displayName, email, password, image }) => {
  const isEmailNew = await User.findOne({ where: { email } });
  if (isEmailNew) throw new CustomError(409, 'User already registered');
  
  const result = await User.create({ displayName, email, password, image });

  return result;
};

const findAll = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return result;
};

const findById = async (id) => {
  const result = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!result) throw new CustomError(404, 'User does not exist');

  return result;
};

module.exports = { login, create, findAll, findById };
