const models = require('../database/models');

const { Category } = models;

const create = async (name) => {
  const result = await Category.create({ name });

  return result;
};

module.exports = { create };