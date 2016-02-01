var User = require('../models/user');

function loadUser(req, res, next) {
  if (req.cookies.token) {
    User.findOne({
      token: req.cookies.token
    }, function(err, dbUser) {
      if (err) return err;
      req.user = dbUser;
      next();
    });
  } else {
    next();
  }
}

module.exports = loadUser;
