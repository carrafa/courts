var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  message: {
    type: String
  }
});

module.exports = mongoose.model('Message', MessageSchema);
