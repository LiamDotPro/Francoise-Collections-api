// Configure out environment to be available.
require('dotenv').config();
// Restify
import restify from 'restify';
// Routers
import AuthRouter from './routers/v1/authentication';
import PayRouter from './routers/v1/payments';
import CatalogRouter from './routers/v1/catalog';

// Defines the port to run the api on.
const port = process.env.PORT || 3000;

let server = restify.createServer({
    name: 'Main Http Server'
});

/**
 * Uses restify v5 plugins to handle parsing of body and queries by default.
 */
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

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

