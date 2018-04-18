require('dotenv').config();
import 'babel-polyfill';
// Database Class.
import db from '../../models/index';
// Products model
const address = db.addresses;

export default class AddressesBase {

    /**
     * Creates a new address record for a customer.
     * @param customerId
     * @param line_1
     * @param line_2
     * @param line_3
     * @param city
     * @param town
     * @param postCode
     * @param county
     * @param houseNumber
     */
    async createAddressRecord(customerId, line_1, line_2, line_3, city, town, postCode, county, houseNumber) {

        if (isNaN(customerId) && !customerId) {
            return {msg: 'No product Identifier was passed.', payload: 1};
        }

        try {

            let createdAddress = await address.create({
                customerId: customerId,
                line_1: line_1,
                line_2: line_2,
                line_3: line_3,
                city: city,
                town: town,
                postCode: postCode,
                county: county,
                houseNumber: houseNumber
            });

            return {msg: 'Success', payload: 0, insertedId: createdAddress.dataValues.id};
        } catch (e) {
            return {msg: 'An error occurred while trying to create a new inventory', payload: 1};
        }
    }

    /**
     * Gets an address record using an id.
     * @param id
     */
    async getAddressById(id) {

        if (!id) {
            return {msg: 'No id specified..', payload: 1};
        }

        try {
            let foundAddress = await address.findAll({
                where: {
                    id: id
                }
            });

            if (foundAddress.length <= 0) {
                return {msg: 'No address record was found..', payload: 1};
            }

            return {msg: 'Success', payload: 0, address: foundAddress[0].dataValues};

        } catch (e) {
            return {msg: 'An error occurred while trying to retrieve a address..', payload: 1};
        }
    }

    /**
     * Gets all avalible address records.
     */
    async getAllAddresses() {
        try {
            let allAddresses = await address.findAll();

            if (allAddresses.length <= 0) {
                return {
                    msg: 'No addresses found..',
                    payload: 1
                }
            }

            let addressList = allAddresses.map((item, index, arr) => {
                return {
                    address: item.dataValues,
                    index: index
                };
            });

            return {
                msg: 'Success',
                payload: 0,
                addressList: addressList
            }

        } catch (e) {
            return {
                msg: 'An error occurred while trying to get the address list.',
                payload: 1
            }
        }
    }

    /**
     * Updates an address using an id.
     * @param id
     * @param line_1
     * @param line_2
     * @param line_3
     * @param city
     * @param town
     * @param postCode
     * @param county
     * @param houseNumber
     */
    async updateAddressById(id, line_1, line_2, line_3, city, town, postCode, county, houseNumber) {
        try {
            let updatedAddress = await address.update({
                line_1: line_1,
                line_2: line_2,
                line_3: line_3,
                city: city,
                town: town,
                postCode: postCode,
                county: county,
                houseNumber: houseNumber
            }, {
                where: {
                    id: id
                }
            });
            return {msg: 'Success', payload: 0};
        } catch (e) {
            return {msg: 'An error occurred while updating the inventory information.', payload: 1};
        }
    }

    /***
     * delete's an address using an id.
     * @param id
     */
    async deleteAddress(id) {

        if (!id) {
            return {msg: 'No id was specified..', payload: 1};
        }

        try {
            return !!await address.destroy({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return false;
        }

    }

}
