var User = require('./models/user');

var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/courts'
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

var nyc_zipcodes = [10453, 10457, 10460, 10458, 10467, 10468, 10451, 10452,
  10456, 10454, 10455, 10459, 10474, 10463, 10471, 10466, 10469, 10470, 10475,
  10461, 10462, 10464, 10465, 10472, 10473, 11212, 11213, 11216, 11233, 11238,
  11209, 11214, 11228, 11204, 11218, 11219, 11230, 11234, 11236, 11239, 11223,
  11224, 11229, 11235, 11201, 11205, 11215, 11217, 11231, 11203, 11210, 11225,
  11226, 11207, 11208, 11211, 11249, 11222, 11220, 11232, 11206, 11221, 11237,
  10026, 10027, 10030, 10037, 10039, 10001, 10011, 10018, 10019, 10020, 10036,
  10029, 10035, 10010, 10016, 10017, 10022, 10012, 10013, 10014, 10004, 10005,
  10006, 10007, 10038, 10280, 10002, 10003, 10009, 10021, 10028, 10044, 10065,
  10075, 10128, 10023, 10024, 10025, 10031, 10032, 10033, 10034, 10040, 11361,
  11362, 11363, 11364, 11354, 11355, 11356, 11357, 11358, 11359, 11360, 11365,
  11366, 11367, 11412, 11423, 11432, 11433, 11434, 11435, 11436, 11101, 11102,
  11103, 11104, 11105, 11106, 11374, 11375, 11379, 11385, 11691, 11692, 11693,
  11694, 11695, 11697, 11004, 11005, 11411, 11413, 11422, 11426, 11427, 11428,
  11429, 11414, 11415, 11416, 11417, 11418, 11419, 11420, 11421, 11368, 11369,
  11370, 11372, 11373, 11377, 11378, 10302, 10303, 10310, 10306, 10307, 10308,
  10309, 10312, 10301, 10304, 10305, 10314
];

var songs = [{
  username: "bjorn",
  name: "bjorn",
  bio: "just a swede whackin a tennis ball.",
  avatar: "https://blog-blogmediainc.netdna-ssl.com/upload/SportsBlogcom/80649/0793202001420044020_filepicker.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "john",
  name: "john",
  bio: "an angry tennis man",
  avatar: "http://www.tennisconsult.com/wp-content/uploads/2012/12/John-McEnroe.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "rod",
  name: "rod",
  bio: "tennis!",
  avatar: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Rod_Laver_1964.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "venus",
  name: "venus",
  bio: "tennis tennis tennis",
  avatar: "http://miamitennisnews.com/wp-content/uploads/2009/09/img_1710-200x300.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "serena",
  name: "serena",
  bio: "woootennisssss",
  avatar: "http://pbs.twimg.com/media/CYlHx1yVAAABWUa.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "dorothy",
  name: "dorothy",
  bio: "tennis is a thing.",
  avatar: "https://ak-hdl.buzzfed.com/static/enhanced/webdr06/2013/7/8/10/enhanced-buzz-19738-1373295093-27.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "virginia",
  name: "virginia",
  bio: "tennis????",
  avatar: "https://ak-hdl.buzzfed.com/static/enhanced/webdr03/2013/7/8/10/enhanced-buzz-10490-1373295077-24.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "bunny",
  name: "bunny",
  bio: "hop hop tennis",
  avatar: "http://i.dailymail.co.uk/i/pix/2009/07/03/article-0-059362F7000005DC-986_233x542.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}, {
  username: "fred",
  name: "fred",
  bio: "tennis and stuff",
  avatar: "http://www.puckedinthehead.com/wp-content/images/Fred-Perry3.jpg",
  skill: Math.floor(Math.random() * 10),
  zipcode: nyc_zipcodes[Math.floor(Math.random() * nyc_zipcodes.length)]
}];

function seedDb() {
  for (i = 0; i < songs.length; i++) {
    var newUser = new User(songs[i]);
    newUser.save();
  }
};


seedDb();



mongoose.disconnect();
