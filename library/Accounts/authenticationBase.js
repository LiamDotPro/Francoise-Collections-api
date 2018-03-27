require('dotenv').config();

import getSqlConnection from '../../db/db';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import db from '../../models/index';

const user = db.account;

// Accounts Model
console.log(user);
/**
 * Abstract class that acts as the concrete functions for our registering api.
 */
export default class authenticationBase {

    constructor() {
        if (process.env.ENVIROMENT === 'production' && new.target === authenticationBase) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     * Encrypts plain text passwords using a safe encryption method.
     * @param password String
     */
    encryptPassword(password) {
        return bcrypt.hash(password, 10).then((hash) => {
            return hash;
        });
    }


    /**
     * Validates a user from within the database.
     * @param email
     * @param password
     */
    validateUser(email, password) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('Select id, u_email, u_password FROM `accounts` Where u_email=?', [email.toLowerCase()]).then((_res) => {
                // Check if we have that account.
                if (!_res.length > 0) {
                    return {
                        msg: 'Account or password did not match!',
                        payload: 1
                    }
                }

                return this.comparePasswords(_res[0].u_password, password).then((res) => {
                    // Incorrect password found.
                    if (!res) {
                        return {
                            msg: 'Account or password did not match!',
                            payload: 1
                        }
                    }

                    // All checks have passed.
                    return {
                        msg: 'Success',
                        payload: 11,
                        user: {
                            id: _res[0].id
                        }
                    }
                })
            });
        });
    }

    /**
     * This does a simple bcrypt comparision to identify correctness.
     * @param hash
     * @param plainText
     */
    comparePasswords(hash, plainText) {
        return bcrypt.compare(plainText, hash).then((res) => {
            return res === true;
        });
    }

    /**
     * Checks to make sure an email is present within a string.
     * @param text
     * @returns {boolean}
     */
    checkIfEmailInString(text) {
        let re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        return re.test(text);
    }

    /**
     * This checks for a duplicate account inside the database.
     * Payload is a boolean Int
     */
    checkForDuplicateAccount(email) {
        return Promise.using(getSqlConnection(), (connection) => {

            if (email.length < 5 || !this.checkIfEmailInString(email)) {
                return {
                    msg: 'Fail - No Email Found',
                    payload: 1
                }
            }

            return connection.query('SELECT `u_email` FROM `accounts` WHERE u_email=?', [email.toLowerCase()]).then((res) => {
                if (res.length !== 0) {
                    return {
                        msg: 'Fail - Duplicate Account',
                        payload: 1
                    }
                }

                // No duplicate found.
                return {
                    msg: 'Success',
                    payload: 0
                }
            }).catch((e) => {
                console.log(e);
            })
        });
    }

    /**
     * Find Account by Id
     */
    findAccountById(id) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('SELECT id, u_email, fullname FROM `accounts` WHERE id=?', [id]).then((res) => {
                return res.length > 0 ? {
                    name: res[0].fullname,
                    email: res[0].u_email,
                    msg: 'success'
                } : false;
            })
        });
    }

    /**
     * Find Account By Id and also verify account status as being administrator.
     */
    findAccountByIdAdmin(id) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('SELECT id, u_email, fullname FROM `accounts` WHERE id=?', [id]).then((res) => {

                // Check to see if there is an occurrence
                if (res.length === 0) {
                    return false
                }

                if (!res.hasOwnProperty('accountType') || res['accountType'] !== 2) {
                    return false;
                }

                return {
                    name: res[0].fullname,
                    email: res[0].u_email,
                    msg: 'success'
                }
            })
        })
    }

    /**
     * This is the last part of the system.
     * All passwords should be ran through bcrypt before being inserted.
     * @param email
     * @param password
     */
    createAccount(email, password) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('INSERT INTO `accounts` (u_email, u_password, accountType) VALUES (?, ?, 1)', [email.toLowerCase(), password]).then((res) => {
                return {msg: 'Success', payload: 10}
            })
        }).catch((e) => {
            console.log(e);
        });
    }

    /**
     * Permanently removes an account from the system.
     *
     * Usage of this method should be heavily guarded as it is a standardized method that provides only base functionality with no security.
     */
    deleteAccount(email, password) {
        return this.getUserPasswordHashWithEmail(email).then((res) => {

            // No has is returned with false'y calls.
            if (!res.hasOwnProperty('hash')) {
                return res;
            }

            // Compare passwords.
            return this.comparePasswords(res.hash, password).then((bool) => {
                if (!bool) {
                    return {msg: 'Incorrect password provided for account delete', payload: 1}
                }

                // Finally delete the account.
                return Promise.using(getSqlConnection(), (connection) => {
                    return connection.query('DELETE FROM `accounts` WHERE u_email=?', [email]).then((res) => {
                        return {msg: 'Account Successfully Deleted.', payload: 0};
                    })
                });

            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });

    }

    /**
     * Gets the users hashed and salted password for the database.
     * This method is only to be used when a validated user with an existing profile makes a call.
     * @param userID
     */
    getUserPasswordHash(userID) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('SELECT u_password from `accounts` WHERE id=?', [userID]).then((res) => {
                return {hash: res[0].u_password}
            });
        });
    }


    /**
     * Helper method that get's a user hash using there email address, to be used alongside deletion of an existing account.
     * @param email
     * @returns {Bluebird<any>}
     */
    getUserPasswordHashWithEmail(email) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('SELECT u_password from `accounts` WHERE u_email=?', [email]).then((res) => {
                if (!res.length > 0) {
                    return {msg: 'No Email found in accounts.', payload: 1};
                }

                return {hash: res[0].u_password};
            })
        });
    }

    /**
     * Inserts a new hashed password into the user account.
     * @param id
     * @param password
     */
    insertNewHashedPassword(id, password) {
        return this.encryptPassword(password).then((hash) => {
            return Promise.using(getSqlConnection(), (connection) => {
                return connection.query('UPDATE `accounts` SET u_password=? WHERE id=?', [hash, id]).then(() => {
                    return {
                        status: 'ok',
                        message: 'Password Changed!'
                    }
                })
            })
        })
    }

}
