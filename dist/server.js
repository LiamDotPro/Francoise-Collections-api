'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _Passport = require('./library/Passport/Passport');

var _Passport2 = _interopRequireDefault(_Passport);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _io = require('./socketio/io');

var _RouterLoader = require('./routers/RouterLoader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// start app

//cors

// express connect redis

//morgan

// express
var app = (0, _express2.default)();
// Configure out environment to be available.

// socketio

// body parser

//Passport

//helmet
require('dotenv').config();

/**
 * Redis Store Configuration
 */
var redisHost = '';
process.env.ENVIROMENT === 'development' ? redisHost = '109.237.26.131' : 'localhost';

var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client = _redis2.default.createClient({ host: '109.237.26.131', port: 6379 });

/**
 * Reddis Sessions
 */
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({ host: '109.237.26.131', port: 6379, client: client, ttl: 260 }),
  saveUninitialized: false,
  resave: true
}));

client.on('connect', function () {
  console.log('Connected to Redis');
});

client.on('error', function (err) {
  console.log('Redis error: ' + err);
});

/**
 * Port Configuration
 */
var port = 3000;
process.env.ENVIROMENT === 'development' ? port = 3000 : port = 8080;

// Setup the socketio api module
(0, _io.setup)(app);

/**
 * Integrate helmet for mitigation of various attacks.
 */
app.use((0, _helmet2.default)());

/**
 * Integrate morgan for developer friendly logs of http requests.
 */
app.use((0, _morgan2.default)('dev'));

/**
 * CORS
 */
app.use((0, _cors2.default)());

/**
 * body parser
 */
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

/**
 * Passport JWT
 */
var configuredPassport = new _Passport2.default();
// Only configure the passport once.
configuredPassport.configurePassport();

app.use(configuredPassport.passport.initialize());
app.use(configuredPassport.passport.session());

// Load routers
(0, _RouterLoader.loadRouters)(app);

app.listen(port, function () {
  console.log('Http Server listening on ', port);
});
//# sourceMappingURL=server.js.map