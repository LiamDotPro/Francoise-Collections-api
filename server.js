// Configure out environment to be available.
require('dotenv').config();
// Restify
import restify from 'restify';
//helmet
import helmet from 'helmet';
//morgan
import morgan from 'morgan';
//Passport
import passport from './library/Passport/Passport';
// express connect reddis
import redis from 'redis';
let session = require('express-session');
let redisStore = require('connect-redis')(session);
let client  = redis.createClient();
// Routers
import AuthRouter from './routers/v1/authentication';
import PayRouter from './routers/v1/payments';
import CatalogRouter from './routers/v1/catalog';
import AccountRouter from './routers/v1/accounts';
import CartRouter from './routers/v1/cart';
import {setup} from './socketio/io';

let port = 3000;

process.env.ENVIROMENT === 'development' ? port = 3000 : port = 80;

let server = restify.createServer({
    name: 'Main Http Server',
    strictRouting: true,
    formatters: {
        'text/html': function (req, res, body, cb) {
            cb(null, body)
        }
    }
});

// Setup the socketio api module
setup(server);

/**
 * Uses restify v5 plugins to handle parsing of body and queries by default.
 */
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

/**
 * Integrate helmet for mitigation of various attacks.
 */
server.use(helmet());

/**
 * Integrate morgan for developer friendly logs of http requests.
 */
server.use(morgan('dev'));

/**
 * Passport JWT
 */
let configuredPassport = new passport();
// Only configure the passport once.
configuredPassport.configurePassport();
server.use(configuredPassport.passport.initialize());

/**
 * Reddis Sessions
 */
server.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));

/**
 * Handle Cross Origin Requests.
 */
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

/**
 * Authentication Routing
 */
AuthRouter.applyRoutes(server, '/v1/auth');

/**
 * Payments Routing
 */
PayRouter.applyRoutes(server, '/v1/pay');

/**
 * Catalog Routing
 */
CatalogRouter.applyRoutes(server, '/v1/catalog');

/**
 * Accounts Routing
 */
AccountRouter.applyRoutes(server, '/v1/accounts');

/**
 * Cart Routing
 */
CartRouter.applyRoutes(server, '/v1/cart');

/**
 * Handles debugging.
 */
server.use((req, res, next) => {
    console.log(req.method + ' ' + req.url);
    return next();
});

/**
 * Handle the serving of static files that live within public.
 */
server.get(
    /\/(.*)?.*/,
    restify.plugins.serveStatic({
        directory: './public',
    })
);

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
