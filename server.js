// Configure out environment to be available.
require('dotenv').config();
// Restify
import restify from 'restify';
//helmet
import helmet from 'helmet';
//morgan
import morgan from 'morgan';
// Routers
import AuthRouter from './routers/v1/authentication';
import PayRouter from './routers/v1/payments';
import CatalogRouter from './routers/v1/catalog';
import AccountRouter from './routers/v1/accounts';
import CartRouter from './routers/v1/cart';

// Defines the port to run the api on.
const port = process.env.PORT || 3000;

let server = restify.createServer({
    name: 'Main Http Server',
    strictRouting: true
});

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
 * Makes the default accepted headers application/json only.
 */
server.pre(function (req, res, next) {
    req.headers.accept = 'application/json';
    return next();
});

server.listen(port, function () {
    console.log('Http Server listening on ', port);
});

