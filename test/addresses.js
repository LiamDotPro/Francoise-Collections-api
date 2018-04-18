require('dotenv').config();
import 'babel-polyfill';
// Include files to test here.
import AddressesBase from '../library/Addresses/AddressesBase';

const addresses = new AddressesBase();

let assert = require('chai').assert;

describe('Addresses', () => {
    describe('Addresses Library', () => {

        let createdId = null;

        it('Should create an initial address record.', async () => {
            let result = await addresses.createAddressRecord(1, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test');
            assert.equal(result.payload, 0, result.msg);
            createdId = result.insertedId;
        });

        it('Should get an address record by Id.', async () => {
            let result = await addresses.getAddressById(createdId);
            assert.equal(result.address.line_1, 'test', result.msg);
        });

        it('Should get all addresses.', async () => {
            let result = await addresses.getAllAddresses();
            assert.isAbove(result.addressList.length, 0, result.msg);
        });

        it('Should update the previously created address.', async () => {
            let result = await addresses.updateAddressById(createdId, 'test2', 'test', 'test', 'test', 'test', 'test', 'test', 'test');
            assert.equal(result.payload, 0, result.msg);
        });

        it('Should delete the previously created address.', async () => {
            let result = await addresses.deleteAddress(createdId);
            return assert.isTrue(result, result.msg);
        });

    });
});