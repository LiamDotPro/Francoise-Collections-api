import 'babel-polyfill';
import authenticationBase from "./authenticationBase";
// Database Class.
import db from '../../models/index';
// Accounts Model
const accounts = db.accounts;

/**
 * Payload Numbering
 *
 * 0 Success
 * 1 Failure
 * 10 Account Creation
 * 11 Successful Login
 */
export default class authentication extends authenticationBase {

    constructor() {
        super();
    }

    /**
     * List of error handling and checks.
     *
     * Duplicate Entry Test
     * length Test
     * @todo test with postman for if extra length is needed, also implementing special char check regexp
     * @param email
     * @param password
     * @constructor
     */
    async registerUser(email, password) {

        let result = await this.checkForDuplicateAccount(email.toLowerCase());

        if (result.payload !== 0) {
            return {
                msg: result.msg
            }
        }

        if (result.payload !== 0) {
            return {
                msg: result.msg
            }
        }

        let res = await this.createAccount(email.toLowerCase(), password);

        return {
            msg: 'New Account Created.',
            payload: res.payload
        };
    }

    /**
     * Separate method from the attempt to validate specifically so we can add extra
     * checks and further integration later if without worrying about moving stuff
     * to methods.
     * @param email
     * @param password
     */
    async login(email, password) {
        return await this.validateUser(email, password);
    }


    /**
     * Updates a users password provided they pass the original current password.
     * @param currPass
     * @param newPass
     * @param userID
     */
    async updateUserPassword(currPass, newPass, userID) {
        let res = await this.getUserPasswordHash(userID);

        let compare = await this.comparePasswords(res.hash, currPass);

        if (!res) {
            return {
                status: 'err',
                message: 'Current Password does not match'
            }
        }

        return await this.insertNewHashedPassword(userID, newPass);
    }

}
