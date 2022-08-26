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

module.exports = { create };