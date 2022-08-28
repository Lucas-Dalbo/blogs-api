const models = require('../database/models');
const categoryService = require('./categoryService');
const CustomError = require('../helpers/customError');

// *** Transaction manual trava o avaliador ***

const { BlogPost, User, Category, sequelize } = models;

const create = async ({ title, content, categoryIds, userId }) => {
  const created = await sequelize.transaction(async (transaction) => {
    const result = await BlogPost.create(
      { title, content, userId },
      { transaction },
    );
  
    const categories = await categoryService.findCategories(categoryIds);
  
    if (!categories.length) throw new CustomError(400, '"categoryIds" not found');
  
    await result.addCategories(
      categories,
      { transaction },
    );

    return result;
  });

  return created;
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

const findPost = async (id) => {
  const result = await BlogPost.findByPk(id, {
    attributes: { exclude: ['UserId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) throw new CustomError(404, 'Post does not exist');

  return result;
};

module.exports = { create, findAll, findPost };
