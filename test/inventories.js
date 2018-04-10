require('dotenv').config();
import 'babel-polyfill';
import Inventories from '../library/Inventories/InventoriesBase';

let assert = require('chai').assert;

const inventories = new Inventories();

describe('Inventories', () => {

    describe('Inventories Library', () => {

        let createdId = null;

        it('Should create a new inventory using the fake product number 0', async () => {
            let result = await inventories.createNewInventory(1, 10, 0, 0, 0);

            if (result.hasOwnProperty('insertedId')) {
                createdId = result.insertedId;
            }

            return assert.equal(result.payload, 0, result.msg);

        });

        it('Should update the product that was just created (By productId) - +10 stock', async () => {
            let result = await inventories.updateInventoryByProductId(1, 19, 1, 0, 0);
            return assert.equal(result.payload, 0, result.msg);
        });

        it('Should get all available Inventories', async () => {
            let result = await inventories.getAllInventories();
            return assert.isAbove(result.inventoryList.length, 0, result.msg);
        });

        it('Should get an inventory using a specific id', async () => {
            let result = await inventories.getInventoryById(createdId);
            return assert.isTrue(result.hasOwnProperty('inventory'), result.msg);
        });

        it('Should get an inventory using a specific product id', async () => {
            let result = await inventories.getInventoryByProductId(1);
            return assert.isTrue(result.hasOwnProperty('inventory'), result.msg);
        });

        it('Should update the product that was just created (By id) - -1 stock', async () => {
            let result = await inventories.updateInventoryById(createdId, 1, 9, 1, 0, 0);
            return assert.equal(result.payload, 0, result.msg);
        });

        it('Should get the inventory using a join from the product table', async () => {

        });

        it('Should delete the newly created inventory', async () => {
            let result = await inventories.deleteInventoryById(createdId);
            return assert.isTrue(result, result.msg);
        });
    });
});