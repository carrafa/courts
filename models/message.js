var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  conversation_id: {
    type: String
  },
  from: {
    type: String
  },
  fromUsername: {
    type: String
  },
  to: {
    type: String
  },
  toUsername: {
    type: String
  },
  message: {
    type: String
  }
});

module.exports = mongoose.model('Message', MessageSchema);
