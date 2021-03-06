var express = require('express');
var router = express.Router();
var User = require('../models/user');

//routes

// index
router.get('/', function(req, res) {
  User.find({}, function(err, dbUsers) {
    res.json({
      users: dbUsers
    });
  });
});

// create
router.post('/', function(req, res, next) {
  console.log('REQ BODY USER, ', req.body.user)
  if (!req.body.user) {
    return next({
      status: 422,
      message: 'Missing arguments'
    });
  }
  var newUser = new User(req.body.user);
  // console.log("NEW USER, ", newUser);
  newUser.save(function(err, dbUser) {
    if (err) {
      res.json({
        error: err.errors
      });
    } else {
      res.json(dbUser);
    }
  });
});

// delete
router.delete('/', function(req, res) {
  if (req.user) {
    User.findByIdAndRemove({
      _id: req.user._id
    }, function(err) {
      if (err) {
        res.status(500).end();
      }
      res.status(204).end();
    });
  }
});

// update
router.put('/:_id', function(req, res) {
  User.findByIdAndUpdate(req.params._id, req.body.user, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next({
        status: 404,
        message: "not found!"
      });
    }
    res.json(user)
  });
});


//load user
router.get('/authenticate', function(req, res) {
  if (req.cookies.token) {
    token = req.cookies.token;
    User.find({
      token: token
    }, function(err, dbUser) {
      res.json({
        user: dbUser
      });
    });
  } else {
    res.json({
      description: 'no success',
      status: 302
    });
  }
});

// log in
router.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, dbUser) {
    if (dbUser) {
      dbUser.authenticate(req.body.password, function(err, isMatch) {
        if (isMatch) {
          dbUser.setToken(err, function() {
            res.json({
              description: 'success',
              token: dbUser.token
            });
          });
        }
      });
    } else {
      res.json({
        description: 'no success',
        status: 302
      });
    }
  });
});


module.exports = router;
