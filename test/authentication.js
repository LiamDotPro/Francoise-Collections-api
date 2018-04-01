let assert = require('chai').assert;

import BaseAuth from '../library/Authentication/authenticationBase';
import FullAuth from '../library/Authentication/authentication';

const auth = new BaseAuth();
const fullAuth = new FullAuth();

describe('Accounts', () => {
    describe('Autentication Library', () => {
        let hash = '';
        let userId = null;

        it('Should find the default account by ID', () => {
            return auth.findAccountById(1).then((data) => {
                return assert.equal(data.email, 'liam@liam.pro');
            });
        });

        it('Should  create a hash given an arbitary password', () => {
            return auth.encryptPassword('123456789').then((hashedPassword) => {
                hash = hashedPassword;
                return assert.isOk(hashedPassword, 'Hash Not created');
            });
        });

        it('Should correctly compare a hashed password - Correct', () => {
            return auth.comparePasswords(hash, '123456789').then((res) => {
                return assert.isOk(res)
            });
        });

        it('Should orrectly compare a hashed password - False', () => {
            return auth.comparePasswords(hash, '12345678').then((res) => {
                return assert.isNotOk(res)
            });
        });

        it('Should find a duplicate account', () => {
            return auth.checkForDuplicateAccount('liam@liam.pro').then((res) => {
                assert.equal(res.payload, 1);
            });
        });

        it('Should catch a string that is empty while searching for duplicate', () => {
            return auth.checkForDuplicateAccount('').then((res) => {
                return assert.equal(res.msg, 'Fail - No Email Found',);
            });
        });

        it('Should catch a string that is not a complete email while searching for duplicate', () => {
            return auth.checkForDuplicateAccount('asdasd@t').then((res) => {
                return assert.equal(res.msg, 'Fail - No Email Found', 'Email duplicate check failed with bad email!');
            });
        });

        it('Should Create an account given an email and a password', () => {
            return auth.createAccount('test@test.com', '123456789').then((res) => {
                return assert.equal(res.payload, 10, 'Test Email was not created!');
            });
        });

        it('Should delete the previously made test account from the database', () => {
            return auth.deleteAccount('test@test.com', '123456789').then((res) => {
                return assert.equal(res.payload, 0, res.msg);
            });
        });


        it('Should Create an account with the facade class', () => {
            return fullAuth.registerUser('test@test.com', '123456789').then((res) => {
                return assert.equal(res.payload, 10, 'Facade class did not create an account!');
            })
        });


        it('Should Login an existing user with there credentials', () => {
            return fullAuth.login('test@test.com', '123456789').then((res) => {
                if (res.payload === 11) {
                    userId = res.user.id;
                }
                return assert.equal(res.payload, 11, res.msg);
            })
        });

        it('Should Change the password of the previously created account', () => {
            return fullAuth.updateUserPassword('123456789', 'test123.', userId).then((res) => {
                return assert.equal(res.payload, 0, res.msg);
            })
        });

        it('Should Delete an account created with the facade class', () => {
            return auth.deleteAccount('test@test.com', 'test123.').then((res) => {
                return assert.equal(res.payload, 0, res.msg);
            });
        });

    });
});