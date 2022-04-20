const jwt = require('express-jwt');
require('dotenv').config();

const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyToken = jwt(
  {
    secret: ACCESS_TOKEN_SECRET,
    algorithms: ['HS256']
  }
).unless({
  path: [
    '/login',
    '/register',
    '/rooms',
    /^\/rooms\/.*/
  ]
});

exports.verifyAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(401);
  }
};

exports.verifySameUser = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.userId) {
    next();
  } else {
    res.sendStatus(401);
  }
};
