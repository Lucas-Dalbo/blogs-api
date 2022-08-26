const categoryService = require('../services/categoryService');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.create(name);
    
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const allCategories = await categoryService.findAll();

    res.status(200).json(allCategories);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll };