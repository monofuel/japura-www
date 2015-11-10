//Monofuel 2015

//load node modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

//load local files
var auth = require('./config/auth');
var dbConfig = require('./config/db');

//load database stuff and connect
require('./models/User');
require('./models/Post');
var serverAddress = 'mongodb://' + dbConfig.server + '/japura';
mongoose.connect(serverAddress);
console.log('connected to DB at %s',serverAddress);

//load passport config
require('./config/passport')(passport);

//set up express
var app = express();
app.set('view engine','ejs');
app.set('trust proxy', true); //behind an nginx proxy

//load static html files from ./public
app.use(express.static(path.join(__dirname, 'public')));

//handle cookies and stuff for passport
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: auth.secret}));
app.use(passport.initialize());
app.use(passport.session());

//for express-flash
app.use(flash());

//load all the routes
require('./routes/Main')(app, passport);
require('./routes/Post')(app, passport);

//start server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('express listening at http://%s:%s',host,port);
});
