var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const asyncify = require('express-asyncify');
const router = express.Router();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOption = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const app = asyncify(express());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.use('/about', require('./routes/about'));
app.use('/pw', require('./routes/pw'));
app.use('/portfolio', require('./routes/portfolio'));
app.use('/tech', require('./routes/techstack'));

const swaggerSpec = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
