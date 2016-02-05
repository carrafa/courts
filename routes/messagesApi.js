var express = require('express');
var router = express.Router();
var Message = require('../models/message');

// routes

// get
router.get('/', function(req, res) {
  console.log('GET API/MESSAGES : req.user._id', req.user._id)
  var query = Message.find({});
  query.or([{
    'from': req.user._id
  }, {
    'to': req.user._id
  }]);
  query.exec(
    function(err, dbMessages) {
      res.json({
        messages: dbMessages
      });
      console.log("dbMessages", dbMessages);
    });
});

// post
router.post('/', function(req, res, next) {
  if (!req.body.message) {
    return next({
      status: 422,
      message: 'Missing arguments'
    });
  }
  var newMessage = new Message(req.body.message);
  newMessage.save(function(err, dbMessage) {
    if (err) {
      res.json({
        error: err.errors
      });
    } else {
      res.json(dbMessage);
    }
  });
});

module.exports = router;
