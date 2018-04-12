import 'babel-polyfill';
// express
import express from 'express';
//helmet
import helmet from 'helmet';
//morgan
import morgan from 'morgan';
//Passport
import passport from './library/Passport/Passport';
// express connect redis
import redis from 'redis';
// body parser
import bodyParser from 'body-parser';
//cors
import cors from 'cors';
// socketio
import {setup} from './socketio/io';
// start app
const app = express();
// Configure out environment to be available.
require('dotenv').config();

/**
 * Redis Store Configuration
 */
let redisHost = '';
process.env.ENVIROMENT === 'development' ? redisHost = '109.237.26.131' : 'localhost';

let session = require('express-session');
let redisStore = require('connect-redis')(session);
let client = redis.createClient({host: '109.237.26.131', port: 6379});

/**
 * Reddis Sessions
 */
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({host: '109.237.26.131', port: 6379, client: client, ttl: 260}),
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
let port = 3000;
process.env.ENVIROMENT === 'development' ? port = 3000 : port = 8080;


// Setup the socketio api module
setup(app);

/**
 * Integrate helmet for mitigation of various attacks.
 */
app.use(helmet());

/**
 * Integrate morgan for developer friendly logs of http requests.
 */
app.use(morgan('dev'));

/**
 * CORS
 */
app.use(cors());

/**
 * body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Passport JWT
 */
let configuredPassport = new passport();
// Only configure the passport once.
configuredPassport.configurePassport();

app.use(configuredPassport.passport.initialize());
app.use(configuredPassport.passport.session());

import {loadRouters} from './routers/RouterLoader';

// Load routers
loadRouters(app);

app.listen(port, () => {
    console.log('Http Server listening on ', port);
});
