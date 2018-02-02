/****************
 * REQUIREMENTS *
 ****************/
var express = require('express');
var app = express();
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));


/************
 * DATABASE *
 ************/
var db = require('./models');
var controllers = require('./controllers');
var mongoose =  require('mongoose');

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});





/**********
 * ROUTES *
 **********/



/*
 * HTML Endpoints
 */

//serving route for GET index.html
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

// app.get('/api', controllers.api.index);
// app.get('/api/projects', controllers.projects.index);
// app.get('/api/projects/:project_id', controllers.projects.show);
//
// app.post('/api/projects', controllers.projects.create);
//
// app.put('/api/projects/:id', controllers.projects.update);
//
// app.delete('/api/projects/:project_id', controllers.projects.destroy);


/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 8080, function () {
  console.log('Express server is up and running on http://localhost:8080/');
});
