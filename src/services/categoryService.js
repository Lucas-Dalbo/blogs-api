const models = require('../database/models');

const { Category } = models;

const create = async (name) => Category.create({ name });

const findAll = async () => Category.findAll();

const findCategories = async (ids) => {
  const result = await Category.findAll({ where: { id: ids } });

  return result;
};

module.exports = { create, findAll, findCategories };