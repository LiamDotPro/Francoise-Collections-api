import db from '../../models/index';

const customers = db.customers;

export default class CustomersBase {

    /**
     * Create a new customer.
     *
     * Address parameter is created by AddressBase
     * @param customerName
     * @param customerPhone
     * @param customerEmailAddress
     * @param otherDetails
     */
    async createCustomer(customerName, customerPhone, customerEmailAddress, otherDetails) {
        if (!customerName || !customerPhone || !customerEmailAddress) {
            return {msg: 'There was an error with the customer information supplied.', payload: 1};
        }

        try {
            let result = await customers.create({
                customerName: customerName,
                customerPhone: customerPhone,
                customerEmailAddress: customerEmailAddress,
                otherDetails: otherDetails
            });

            return {msg: 'Success', payload: 0, insertedId: result.dataValues.id};
        }
        catch (e) {
            return {msg: 'An error occurred while trying to create a new customer', payload: 1};
        }
    }

    /**
     * Gets a customer using an id.
     * @param id
     */
    async getCustomerById(id) {
        if (!id) {
            return {msg: 'No id was specified.', payload: 1}
        }

        let result = await customers.findById(id);

        if (!(!!result)) {
            return {msg: 'No customer was found with that id..', customer: {id: null}, payload: 1};
        }

        return {msg: 'Success', payload: 0, customer: result.dataValues};
    }

    /**
     * Gets a list of all customers.
     */
    async getAllCustomers() {

        try {
            let allCustomers = await customers.findAll();

            if (allCustomers.length <= 0) {
                return {
                    msg: 'No customers found..',
                    payload: 1
                }
            }

            let customerList = allCustomers.map((item, index, arr) => {
                return {
                    customer: item.dataValues,
                    index: index
                };
            });

            return {
                msg: 'Success',
                payload: 0,
                customerList: customerList
            }

        } catch (e) {
            return {
                msg: 'An error occurred while trying to get the customer list.',
                payload: 1
            }
        }

    }

    /**
     * Updates a customer.
     * @param customerName
     * @param customerPhone
     * @param customerEmailAddress
     * @param otherDetails
     * @param id
     */
    async updateCustomerById(id, customerName, customerPhone, customerEmailAddress, otherDetails) {

        try {
            let updatedCustomer = await customers.update({
                customerName: customerName,
                customerPhone: customerPhone,
                customerEmailAddress: customerEmailAddress,
                otherDetails: otherDetails
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

    /**
     * Delete's a customer using an id.
     * @param id
     */
    async deleteCustomerById(id) {
        if (!id) {
            return {msg: 'No id was specified..', payload: 1}
        }

        try {
            return !!await customers.destroy({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return false;
        }

    }
}
