const userService = require('../services/userService');
const JWT = require('../auth/JWT');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });
  
    const token = JWT.create(user);
  
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await userService.create({ displayName, email, password, image });
    
    const token = JWT.create(newUser);
    
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const allUsers = await userService.findAll();

    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.data;
    await userService.remove(id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { login, create, findAll, findById, remove };
