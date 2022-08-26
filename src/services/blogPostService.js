const Sequelize = require('sequelize');
const models = require('../database/models');
const categoryService = require('./categoryService');
const CustomError = require('../helpers/customError');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);
const { BlogPost, PostCategory } = models;

const create = async ({ title, content, categoryIds, userId }) => {
  const transaction = await sequelize.transaction();

  const blogPost = await BlogPost.create({
    title,
    content,
    userId,
  }, { transaction });

  const categories = await categoryService.findCategories(categoryIds);

  if (!categories.length) throw new CustomError(400, '"categoryIds" not found');

  await Promise.all(
    categories.map(async (category) => {
      const categoryId = category.dataValues.id;
      await PostCategory.create({ postId: blogPost.id, categoryId }, { transaction });
    }),
  );

  await transaction.commit();

  return blogPost;
};

module.exports = { create };
