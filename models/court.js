var mongoose = require('mongoose');

var CourtSchema = mongoose.Schema({
  prop_id: {
    type: String
  },
  name: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  courts: {
    type: String
  },
  indoor_outdoor: {
    type: String
  },
  tennis_type: {
    type: String
  },
  accessible: {
    type: String
  },
  info: {
    type: String
  },
  lat: {
    type: String
  },
  lon: {
    type: String
  }
});

module.exports = mongoose.model('Court', CourtSchema);
