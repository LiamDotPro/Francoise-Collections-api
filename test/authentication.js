import 'babel-polyfill';

let assert = require('chai').assert;

import db from '../models/index';
import Auth from '../library/Accounts/authenticationBase';

const accounts = db.accounts;
const auth = new Auth();

describe('Test', () => {
    describe('create a user', async () => {
        let password = await auth.encryptPassword('Belkinlr93.');
        accounts.create({
            u_email: 'liam.pro',
            u_password: password,
            accountType: 2,
            fullname: 'Liam Read'
        }).then((user) => {
            console.log(user);
        })
    })
});