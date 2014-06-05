var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var ForceDotComStrategy = require('passport-forcedotcom').Strategy;

var app = express();
var router = express.Router();


passport.use(new ForceDotComStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  scope: ['id','api'],
  callbackURL: config.CALLBACK_URL
}, function verify(token, refreshToken, profile, done) {
  console.log(profile);
  return done(null, profile);
}));


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Ragnar', body: 'body text test' });
});

app.get('/auth/forcedotcom', passport.authenticate('forcedotcom'));
// this should match the callbackURL parameter above:
app.get('/auth/forcedotcom/callback',
  passport.authenticate('forcedotcom', { failureRedirect: '/error' }),
  function(req, res){
    res.render("index",checkSession(req));
  }
);




// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});




var server = app.listen(8888, function() {
    console.log('Listening on port %d', server.address().port);
});