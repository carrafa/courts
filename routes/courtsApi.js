var express = require('express');
var router = express.Router();
var Court = require('../models/court');

// routes

// get
router.get('/', function(req, res) {
  Court.find({}, function(err, dbCourts) {
    res.json({
      courts: dbCourts
    });
  });
});

// post
router.post('/', function(req, res, next) {
  if (!req.body.court) {
    return next({
      status: 422,
      message: 'Missing arguments'
    });
  }
  var newCourt = new Court(req.body.court);
  newCourt.save(function(err, dbCourt) {
    if (err) {
      res.json({
        error: err.errors
      });
    } else {
      res.json(dbCourt);
    }
  });
});

module.exports = router;
