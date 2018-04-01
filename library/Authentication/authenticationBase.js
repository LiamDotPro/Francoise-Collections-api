require('dotenv').config();
import 'babel-polyfill';
import bcrypt from 'bcrypt';
// Database Class.
import db from '../../models/index';
// Accounts Model
const accounts = db.accounts;

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
    async encryptPassword(password) {
        return await bcrypt.hash(password, 10);
    }


    /**
     * Validates a user from within the database.
     * @param email
     * @param password
     */
    async validateUser(email, password) {

        let foundAccounts = await accounts.findAll({where: {u_email: email}});

        if (!foundAccounts.length > 0) {
            return {
                msg: 'Account or password did not match!',
                payload: 1
            }
        }

        let res = await this.comparePasswords(foundAccounts[0].dataValues.u_password, password);

        if (!res) {
            return {
                msg: 'Account or password did not match!',
                payload: 1
            }
        }

        return {
            msg: 'Success',
            payload: 11,
            user: {
                id: foundAccounts[0].dataValues.id
            }
        };
    }

    /**
     * This does a simple bcrypt comparision to identify correctness.
     * @param hash
     * @param plainText
     */
    async comparePasswords(hash, plainText) {
        return await bcrypt.compare(plainText, hash);
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
    async checkForDuplicateAccount(email) {
        if (email.length < 5 || !this.checkIfEmailInString(email)) {
            return {
                msg: 'Fail - No Email Found',
                payload: 1
            }
        }

        let result = await accounts.findAll({
            where: {
                u_email: email
            }
        });

        if (result.length !== 0) {
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
    }

    /**
     * Find Account by Id
     */
    async findAccountById(id) {
        let res = await accounts.findAll({
            where: {
                id: id
            }
        });

        return res.length > 0 ? {
            name: res[0].dataValues.fullname,
            email: res[0].dataValues.u_email,
            msg: 'success'
        } : false;
    }

    /**
     * Find Account By Id and also verify account status as being administrator.
     */
    async findAccountByIdAdmin(id) {

        let res = await accounts.findAll({
            where: {
                id: id
            }
        });

        // Check to see if there is an occurrence
        if (res.length === 0) {
            return false;
        }

        if (!res[0].dataValues.hasOwnProperty('accountType') || res[0].dataValues.accountType !== 2) {
            return false;
        }

        return {
            name: res[0].dataValues.fullname,
            email: res[0].dataValues.u_email,
            accountType: res[0].dataValues.accountType,
            msg: 'success'
        }

    }

    /**
     * This is the last part of the system.
     * All passwords should be ran through bcrypt before being inserted.
     * @param email
     * @param password string
     */
    async createAccount(email, password) {
        let pass = await this.encryptPassword(password);
        let createdAccount = await accounts.create({
            u_email: email,
            u_password: pass,
            accountType: 1,
            fullname: ''
        });

        return {
            msg: 'Success', payload: 10
        };
    }

    /**
     * Permanently removes an account from the system.
     *
     * Usage of this method should be heavily guarded as it is a standardized method that provides only base functionality with no security.
     */
    async deleteAccount(email, password) {

        let userObj = await this.getUserPasswordHashWithEmail(email);

        // Make sure that hash property is found on result object
        if (!userObj.user.dataValues.hasOwnProperty('u_password')) {
            return {msg: 'An error occurred.', payload: 1}
        }

        let bool = await this.comparePasswords(userObj.user.dataValues.u_password, password);

        if (!bool) {
            return {msg: 'Incorrect password provided for account delete', payload: 1}
        }

        // Remove the user.
        await userObj.user.destroy({force: true});

        return {msg: 'Success', payload: 0};

    }

    /**
     * Gets the users hashed and salted password for the database.
     * This method is only to be used when a validated user with an existing profile makes a call.
     * @param userID
     */
    async getUserPasswordHash(userID) {
        let res = await accounts.findAll({
            where: {
                id: userID
            }
        });

        if (!res.length > 0) {
            return {msg: 'Fail', payload: 1}
        }

        return {hash: res[0].dataValues.u_password, msg: 'Success', payload: 0};
    }


    /**
     * Helper method that get's a user hash using there email address, to be used alongside deletion of an existing account.
     * @param email
     */
    async getUserPasswordHashWithEmail(email) {

        let res = await accounts.findAll({
            where: {
                u_email: email
            }
        });

        if (!res.length > 0) {
            return {msg: 'No Email found in accounts.', payload: 1};
        }

        return {user: res[0], payload: 0};
    }

    /**
     * Inserts a new hashed password into the user account.
     * @param id
     * @param password
     */
    async insertNewHashedPassword(id, password) {

        let account = await accounts.findAll({
            where: {
                id: id
            }
        });

        if (!account.length > 0) {
            return {
                msg: 'Account not found!',
                payload: 1
            }
        }

        let hashedPassword = await this.encryptPassword(password);

        await accounts.update({
            u_password: hashedPassword
        }, {
            where: {
                id: id
            }
        });

        return {
            msg: 'Password Changed!',
            payload: 0
        };
    }

}
