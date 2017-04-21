var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect("mongodb://admin-event-go-2017:yQXrOtozwz7WeRT0@event-go-shard-00-00-cwtex.mongodb.net:27017,event-go-shard-00-01-cwtex.mongodb.net:27017,event-go-shard-00-02-cwtex.mongodb.net:27017/event-go?ssl=true&replicaSet=event-go-shard-0&authSource=admin");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.")

});
autoIncrement.initialize(db);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  var originPermiss = req.headers.origin == null ? "*": req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', originPermiss);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'event-go-event-go-2017-lv',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 60 * 60,
      httpOnly: false // <- set httpOnly to false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

var index = require('./src/routes/index');
var v10 = require('./src/routes/api/v1.0.js');
var v10Client = require('./src/routes/api/v1.0.client.js');
var v10ClientUsers = require('./src/routes/api/v1.0.client.users');

app.use('/', index);
app.use('/api/v1.0', v10);
app.use('/api/v1.0/client', v10Client);
app.use('/api/v1.0/client/users', v10ClientUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = require('http').createServer(app);
var test = require('./src/test')();

server.listen(8008);

module.exports = app;
