'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _Passport = require('./library/Passport/Passport');

var _Passport2 = _interopRequireDefault(_Passport);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _authentication = require('./routers/v1/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _payments = require('./routers/v1/payments');

var _payments2 = _interopRequireDefault(_payments);

var _catalog = require('./routers/v1/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _accounts = require('./routers/v1/accounts');

var _accounts2 = _interopRequireDefault(_accounts);

var _cart = require('./routers/v1/cart');

var _cart2 = _interopRequireDefault(_cart);

var _io = require('./socketio/io');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure out environment to be available.
require('dotenv').config();
// Restify

//helmet

//morgan

//Passport

// express connect reddis

var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client = _redis2.default.createClient();
// Routers


var port = 3000;

process.env.ENVIROMENT === 'development' ? port = 3000 : port = 80;

var server = _restify2.default.createServer({
  name: 'Main Http Server',
  strictRouting: true,
  formatters: {
    'text/html': function textHtml(req, res, body, cb) {
      cb(null, body);
    }
  }
});

// Setup the socketio api module
(0, _io.setup)(server);

/**
 * Uses restify v5 plugins to handle parsing of body and queries by default.
 */
server.use(_restify2.default.plugins.bodyParser());
server.use(_restify2.default.plugins.queryParser());

/**
 * Integrate helmet for mitigation of various attacks.
 */
server.use((0, _helmet2.default)());

/**
 * Integrate morgan for developer friendly logs of http requests.
 */
server.use((0, _morgan2.default)('dev'));

/**
 * Passport JWT
 */
var configuredPassport = new _Passport2.default();
// Only configure the passport once.
configuredPassport.configurePassport();
server.use(configuredPassport.passport.initialize());

/**
 * Reddis Sessions
 */
server.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
  saveUninitialized: false,
  resave: false
}));

/**
 * Handle Cross Origin Requests.
 */
server.use(function crossOrigin(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});

/**
 * Authentication Routing
 */
_authentication2.default.applyRoutes(server, '/v1/auth');

/**
 * Payments Routing
 */
_payments2.default.applyRoutes(server, '/v1/pay');

/**
 * Catalog Routing
 */
_catalog2.default.applyRoutes(server, '/v1/catalog');

/**
 * Accounts Routing
 */
_accounts2.default.applyRoutes(server, '/v1/accounts');

/**
 * Cart Routing
 */
_cart2.default.applyRoutes(server, '/v1/cart');

/**
 * Handles debugging.
 */
server.use(function (req, res, next) {
  console.log(req.method + ' ' + req.url);
  return next();
});

/**
 * Handle the serving of static files that live within public.
 */
server.get(/\/(.*)?.*/, _restify2.default.plugins.serveStatic({
  directory: './public'
}));

/**
 * Makes the default accepted headers application/json only.
 */
server.pre(function (req, res, next) {
  req.headers.accept = 'application/json';
  return next();
});

server.listen(port, function () {
  console.log('Http Server listening on ', port);
});
//# sourceMappingURL=server.js.map