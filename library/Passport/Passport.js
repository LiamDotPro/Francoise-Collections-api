import Auth from '../Authentication/authentication';
import passport from 'passport';

require('dotenv').config();
const auth = new Auth();
const LocalStrategy = require('passport-local').Strategy;

export default class ConfiguredPassport {

    constructor() {
        this.passport = passport;
    }

    configurePassport() {

        this.passport.serializeUser((id, done) => {
            done(null, id);
        });

        this.passport.deserializeUser((id, done) => {
            done(null, id);
        });

        let strategy = new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                let authResult = await auth.validateUser(email, password);

                if (authResult.payload !== 11) {
                    return done(null, false, {message: "Incorrect email or password supplied"});
                }
                return done(null, authResult.user.id);
            } catch (e) {
                return done(null, false, {message: "An error occurred while trying to login.."});
            }
        });

        this.passport.use('local', strategy);
        //this.passport.use('admin', adminStrategy);
    }
}

export function requireAuthenticated(req, res, next) {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
        res.redirect(200, '/');
    }

    return next();
}
