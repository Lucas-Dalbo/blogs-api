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

const findAll = async (_req, res, next) => {
  try {
    const posts = await blogPostService.findAll();

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const findPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await blogPostService.findPost(id);

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findPost };
