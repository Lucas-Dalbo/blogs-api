const Sequelize = require('sequelize');
const models = require('../database/models');
const categoryService = require('./categoryService');
const CustomError = require('../helpers/customError');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);
const { BlogPost, User, Category } = models;

const create = async ({ title, content, categoryIds, userId }) => {
  const transaction = await sequelize.transaction();

  const result = await BlogPost.create(
    { title, content, userId },
    { transaction },
  );

  const categories = await categoryService.findCategories(categoryIds);

  if (!categories.length) throw new CustomError(400, '"categoryIds" not found');

  await result.addCategories(categories, { transaction });
    
  await transaction.commit();
  return result;
};

const findAll = async () => {
  const result = await BlogPost.findAll(
    {
    attributes: { exclude: ['UserId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    },
  );

  return result;
};

module.exports = { create, findAll };
