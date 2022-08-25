require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const create = (data) => {
  const token = jwt.sign(
    { data },
    secret,
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  return token;
};

module.exports = { create };
