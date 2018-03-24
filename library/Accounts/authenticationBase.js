require('dotenv').config();

import getSqlConnection from '../../db/db';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';

/**
 * Abstract class that acts as the concrete functions for our registering api.
 */
export default class authenticationBase {

    constructor() {
        if (process.env.ENVIROMENT === 'production') {
            if (new.target === authenticationBase) {
                throw new TypeError("Cannot construct Abstract instances directly");
            }
        }
    }

    /**
     * Encrypts plain text passwords using a safe encryption method.
     * @param password String
     */
    encryptPassword(password) {
        const saltRounds = 10;

        return bcrypt.hash(password, saltRounds).then(function (hash) {
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
            return connection.query('Select id, u_email, u_password FROM `accounts` Where userName=?', [email.toLowerCase()]).then((_res) => {
                // Check if we have that account.
                if (_res.length > 0) {
                    return this.comparePasswords(_res[0].u_password, password).then((res) => {
                        if (res) {
                            return {
                                msg: 'Success',
                                payload: 11,
                                user: {
                                    id: _res[0].id
                                }
                            }
                        } else {
                            return {
                                msg: 'Fail',
                                payload: 1
                            }
                        }
                    })
                } else {
                    return {
                        msg: 'Fail',
                        payload: 1
                    }
                }
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
                if (res.length === 0) {
                    return {
                        msg: 'Success',
                        payload: 0
                    }
                } else {
                    return {
                        msg: 'Fail - Duplicate Account',
                        payload: 1
                    }
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
            return connection.query('SELECT id, u_email FROM `accounts` WHERE id=?', [id]).then((res) => {
                if (res.length > 0) {
                    return {
                        name: res[0].fullName,
                        email: res[0].u_email,
                        msg: 'success'
                    };
                } else {
                    return false;
                }
            })
        });
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
                    return {msg: 'Incorrect password provided for account delete', payload: 0}
                }

                // Finally delete the account.
                return Promise.using(getSqlConnection(), (connection) => {
                    return connection.query('DELETE FROM `accounts` WHERE u_email=?', [email]).then((res) => {
                        return {msg: 'Account Successfully Deleted.', payload: 1};
                    })
                });

            })
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
            })
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
                if (res.length > 0) {
                    return {hash: res[0].u_password};
                } else {
                    return {msg: 'No Email found in accounts.', payload: 0};
                }
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