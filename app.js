var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

require('./models/User');
require('./models/Post');

var serverAddress = 'mongodb://192.168.11.160/japura';
mongoose.connect(serverAddress);
console.log('connected to DB at %s',serverAddress);

require('./config/passport')(passport);

app.set('view engine','ejs');
app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'superawesomecrazyjapurasecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/Main')(app, passport);
require('./routes/Post')(app, passport);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('express listening at http://%s:%s',host,port);
});
