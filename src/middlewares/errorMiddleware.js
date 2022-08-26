const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi) {
    console.log(err);
    return res.status(400)
      .json({ message: err.details[0].message });
  }

  if (!err.status) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (err.name === 'invalid signature') return res.status(401).json({ message: err.message });

  const { message, status } = err;
  res.status(status).json({ message });
};

module.exports = errorMiddleware;
