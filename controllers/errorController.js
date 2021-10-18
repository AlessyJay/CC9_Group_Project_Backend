module.exports = (err, req, res, next) => {
  // console.log(err);
  console.log(JSON.stringify(err, null, 2));

  let code;
  let message;

  if (err.name === 'SequelizeUniqueConstraintError') {
    code = 400;
    message = 'Email or Username is already use.';
  }

  if (err.name === 'SequelizeValidationError') {
    code = 400;
    message = 'Invalid email format';
  }
  if (err.name === 'JsonWebTokenError') {
    code = 401;
  }

  res.status(code || err.code || 500).json({ message: message || err.message });
};
