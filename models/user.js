var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  }
}, {
  timestamps: true
});

// pre save hook
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  return next();
});

// set new token

UserSchema.methods.setToken = function(err, done) {
  var scope = this;
  crypto.randomBytes(256, function(err, buf) {
    if (err) return done(err)
    scope.token = buf;
    scope.save(function(err) {
      if (err) return done(err);
      done();
    });
  });
};

// check password
UserSchema.methods.authenticate = function(passwordTry, callback) {
  bcrypt.compare(passwordTry, this.password, function(err, isMatch) {
    if (err) return (callback(err));
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
