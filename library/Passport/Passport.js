import passportJWT from 'passport-jwt';
import Auth from '../Accounts/authentication';
import passport from 'passport';

require('dotenv').config();
const auth = new Auth();

export default class ConfiguredPassport {

    constructor() {
        this.passport = passport;
    }

    configurePassport() {
        // Passport Data
        let ExtractJwt = passportJWT.ExtractJwt;
        let JwtStrategy = passportJWT.Strategy;

        let jwtOptions = {};
        jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        jwtOptions.secretOrKey = process.env.JWT_SECRET;

        const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            auth.findAccountById(jwt_payload.id).then((res) => {
                if (res.msg === 'success') {
                    next(null, jwt_payload.id);
                } else {
                    next(null, false);
                }
            })
        });

        const adminStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            auth.findAccountById(jwt_payload.id).then((res) => {
                if (res.msg === 'success') {
                    next(null, jwt_payload.id);
                } else {
                    next(null, false);
                }
            })
        });

        this.passport.use('jwt', strategy);
        this.passport.use('admin', adminStrategy);
    }
}
