const userService = require('../services/userService');
const JWT = require('../auth/JWT');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });
  
    const token = JWT.create(user);
  
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    const { message, status } = err;
    res.status(status).json({ message });
  }
};

module.exports = { login };
