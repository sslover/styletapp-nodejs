
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose =  require('mongoose');

// the ExpressJS App
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

  // server port number
  app.set('port', process.env.PORT || 5000);

  //  templates directory to 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // database - skipping until week 5
  app.db = mongoose.connect(process.env.MONGOLAB_URI);
  console.log("connected to db!");
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* 
SKIPPING FOR FUTURE CLASSES
SESSIONS w/ MongoDB (store sessions across multiple dynos)
COOKIEHASH in your .env file (also share with heroku) 
*/
// app.use(express.cookieParser(process.env.COOKIEHASH));
// app.use(express.session({ 
//     store: new mongoStore({url:process.env.MONGOLAB_URI, maxAge: 300000})
//     , secret: process.env.COOKIEHASH
//   })
// );

// ROUTES
var routes = require('./routes/index.js');
// home page
app.get('/', routes.index);
// clothing page
app.get('/c/:clothing_id', routes.detail);
// user page that shows all their clothing
app.get('/u/:user_id')

//new clothing routes
app.get('/add',routes.addClothing); //display form
app.post('/add',routes.createClothing); //form POST submits here

app.get('/c/:clothing_id/edit',routes.editForm); //display form
app.post('/c/:clothing_id/edit',routes.editClothing); //form POST submits here

app.get('/loadclothing', routes.loadData); // load in astronauts array into db

// mobile app routes
app.post('/android',routes.parseJson);
app.post('/get_tag_info', routes.getInfo);
app.post('/get_all_records', routes.returnRecords)


// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
