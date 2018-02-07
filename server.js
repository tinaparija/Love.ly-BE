/****************
 * REQUIREMENTS *
 ****************/
var express = require('express');
var app = express();
var router = require('./config/routes.js');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));
app.use(bodyParser.json());



/************
 * DATABASE *
 ************/
var models = require('./models');
var controllers = require('./controllers/controller.js');
var mongoose =  require('mongoose');

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(router);


/**********
 * ROUTES *
 **********/



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 8080, function () {
  console.log('Express server is up and running on http://localhost:8080/');
});
