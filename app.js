var express = require('express');
var app = express();


// database
var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/courts'
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

// middleware

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var bourbon = require('node-neat').includePaths;
app.use(sassMiddleware({
  includePaths: bourbon,
  src: './src/sass',
  dest: path.join('./public', 'css'),
  debug: true,
  prefix: '/css'
}));
app.use(express.static(path.join('css', 'public')));

var morgan = require('morgan');
app.use(morgan('dev'));

app.set('view engine', 'jade');

app.use(express.static('./public'));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var loadUser = require('./middleware/loadUser');
app.use(loadUser);


//routes
var usersApi = require('./routes/usersApi');
app.use('/api/users', usersApi);

var courtsApi = require('./routes/courtsApi');
app.use('/api/courts', courtsApi);

var courts = require('./routes/courts');
app.use('/courts', courts);

app.get('/welcome', function(req, res) {
  if (req.cookies.token) {
    res.redirect('/')
  } else {
    res.render('welcome');
  }
});

var index = require('./routes/index');
app.use('/', index);


//listen
var port = parseInt(process.env.PORT) || 8080;

app.listen(port, function() {
  console.log('i am a server. my port is ', port);
})
