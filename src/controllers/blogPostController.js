const blogPostService = require('../services/blogPostService');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.data;

    const post = await blogPostService.create({ title, content, categoryIds, userId });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
