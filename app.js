var createError = require('http-errors');
var express = require('express');
const exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const hbs_sections = require('express-handlebars-sections');


var app = express();

// view engine setup
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
   defaultLayout: 'layout.hbs',
   layoutsDir: 'views',
    helpers: {
    section: hbs_sections(),
  }
}));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //     secure: true
  // }
}))



require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
