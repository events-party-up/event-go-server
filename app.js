var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var users = require('./routes/users');
var v10 = require('./routes/users');

app.use('/', index);
app.use('/users', users);
app.use('/api/v1.0', v10);

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

server.listen(8008);

module.exports = app;

/*
var source = Rx.Observable.create(function (observer) {
    // sử dụng `onNext` push `num` vào observer lần lượt 500 mili giây
    var num = 0;
    var id = setInterval(function () {
        observer.onNext(num++);
    }, 500);

    setTimeout(function () {
        observer.onCompleted();
    }, 10000);

    return function () {
        console.log('disposed');
        clearInterval(id);
    };
});

var subscription = source.subscribe(
    function (x) {
        console.log('onNext: ' + x);
    },
    function (e) {
        console.log('onError: ' + e.message);
    },
    function () {
        console.log('onCompleted');
    });

setTimeout(function () {
    subscription.dispose();
}, 5000);
*/
