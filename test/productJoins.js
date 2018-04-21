import 'babel-polyfill';
import ProductBase from '../library/Products/productsBase';
import db from '../models/index';

let assert = require('chai').assert;

const products = new ProductBase();

describe('Product Joins', () => {
    describe('Product Join tests', () => {

        let createdItemId = null;

        it('Should create a new product', async () => {
            let result = await products.createProduct('Test Product', 'This is a test item', 'thumbnail.png', 'Dispatches in 2-4 days', 0, false, new Date("2018-03-31 02:00:07.525+01"), new Date("2018-03-31 02:00:07.525+01"));
            createdItemId = result.insertedId;
            return assert.equal(0, result.payload, result.msg);
        });

        it('Should get the newly created product joined with Inventories table.', async () => {
            try {
                let result = await db.product.findAll({
                    where: {
                        id: createdItemId
                    },
                    include: [{
                        model: db.inventory,
                        where: {
                            productIdentifer: createdItemId
                        }
                    }]
                });

                /**
                 * , {
                        model: db.productImages,
                        where: {
                            productId: createdItemId
                        }
                    
                 */

                console.log(result);

                return assert.equal(result[0].dataValues.inventory.productIdentifer, createdItemId, result.msg);
            } catch (e) {
                console.log(e);
            }
        });

        it('Should delete the previously made product', async () => {
            let result = await products.deleteProduct(createdItemId);
            return assert.isTrue(result, "Record could not be deleted..");
        });

    });
});