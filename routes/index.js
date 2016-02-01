var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.cookies.token) {
    res.render('index');
  } else {
    res.redirect('/welcome');
  }
})

module.exports = router;
