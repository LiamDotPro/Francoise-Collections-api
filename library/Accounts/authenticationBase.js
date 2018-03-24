import getSqlConnection from '../lib/db';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';

/**
 * Abstract class that acts as the concrete functions for our registering api.
 */
export default class baseUserFunctions {

    constructor() {
        if (new.target === baseUserFunctions) {
            throw new TypeError("Cannot construct Abstract instances directly");
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
            return connection.query('Select id, userName, Password FROM `accounts` Where userName=?', [email.toLowerCase()]).then((_res) => {
                // Check if we have that account.
                if (_res.length > 0) {
                    return this.comparePasswords(_res[0].Password, password).then((res) => {
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
     * This checks for a duplicate account inside the database.
     * Payload is a boolean Int
     */
    checkForDuplicateAccount(email) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('SELECT `userName` FROM `accounts` WHERE userName=?', [email.toLowerCase()]).then((res) => {
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
            return connection.query('SELECT id,userName FROM `accounts` WHERE id=?', [id]).then((res) => {
                if (res.length > 0) {
                    return {
                        name: res[0].name,
                        email: res[0].userName,
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
            return connection.query('INSERT INTO `accounts` (userName, Password) VALUES (?, ?)', [email.toLowerCase(), password]).then((res) => {
                return {msg: 'Success', payload: 10}
            })
        }).catch((e) => {
            console.log(e);
        });
    }

    /**
     * Gets the users hashed and salted password for the database.
     * This method is only to be used when a validated user with an existsing profile makes a call.
     * @param userID
     */
    getUserPasswordHash(userID) {
        return Promise.using(getSqlConnection(), (connection) => {
            return connection.query('SELECT Password from `accounts` WHERE id=?', [userID]).then((res) => {
                return {hash: res[0].Password}
            })
        })
    }

    /**
     * Inserts a new hashed password into the user account.
     * @param id
     * @param password
     */
    insertNewHashedPassword(id, password) {
        return this.encryptPassword(password).then((hash) => {
            return Promise.using(getSqlConnection(), (connection) => {
                return connection.query('UPDATE `accounts` SET Password=? WHERE id=?', [hash, id]).then(() => {
                    return {
                        status: 'ok',
                        message: 'Password Changed!'
                    }
                })
            })
        })
    }

}