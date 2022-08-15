const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const authorization = req.headers.cookie;
  if (!authorization || !authorization.startsWith('jwt=')) {
    next(new Unauthorized('Необходима авторизация'));
  } else {
    const token = authorization.replace('jwt=', '');
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new Unauthorized('Необходима авторизация'));
    }
    req.user = payload._id;
    next();
  }
};
