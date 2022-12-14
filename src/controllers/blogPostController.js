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

const update = async (req, res, next) => {
  try {
    const { id: userId } = req.data;
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await blogPostService.update({ userId, id, title, content });

    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id: userId } = req.data;
    const { id } = req.params;

    await blogPostService.remove({ userId, id });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const getByQuery = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      const posts = await blogPostService.findAll();
      res.status(200).json(posts);
    }

    const posts = await blogPostService.getByQuery(q);

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findPost, update, remove, getByQuery };
