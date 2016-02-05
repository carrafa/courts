var express = require('express');
var router = express.Router();
var Message = require('../models/message');

// routes

// get
router.get('/', function(req, res) {
  Message.find({
      conversation_id: new RegExp(req.user._id)
    },
    function(err, dbMessages) {
      res.json({
        messages: dbMessages
      });
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
