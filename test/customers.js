require('dotenv').config();
import 'babel-polyfill';
// Include files to test here.
import CustomerBase from '../library/Customers/CustomersBase';

let customer = new CustomerBase();

let assert = require('chai').assert;

describe('Customers', () => {
    describe('Customers Library', () => {

        let createdId = null;

        it('Should create a new customer', async () => {
            let result = await customer.createCustomer('Liam', '07710679993', 'liam@liam.pro', '');
            assert.equal(result.payload, 0, result.msg);
            createdId = result.insertedId;
        });

        it('Should get the previously created customer', async () => {
            let result = await customer.getCustomerById(createdId);
            assert.equal(result.customer.id, createdId, result.msg);
        });

        it('Should get all the customers', async () => {
            let result = await customer.getAllCustomers();
            assert.isAbove(result.customerList.length, 0, result.msg);
        });

        it('Should update the previously made customer', async () => {
            let result = await customer.updateCustomerById(createdId, 'Barry', '07710679993', 'liam@liam.pro', '');
            return assert.equal(result.payload, 0, result.msg);

        });

        it('Should delete the previously made customer', async () => {
            let result = await customer.deleteCustomerById(createdId);
            return assert.isTrue(result, result.msg);
        });

    });
});