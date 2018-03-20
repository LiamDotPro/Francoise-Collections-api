// Restify
import restify from 'restify';
// Routers
import AuthRouter from './routers/v1/authentication';

const port = process.env.PORT || 3000;

let app = restify.createServer({
    name: 'Main Http Server'
});

app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());


/**
 * Authentication Routing
 */
AuthRouter.applyRoutes(app, '/v1/auth');

/**
 * Payments Routing
 */

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.url);
    return next();
});

app.listen(port, function () {
    console.log('Http Server listening on ', port);
});

