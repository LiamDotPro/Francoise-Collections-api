import 'babel-polyfill';
import ProductBase from '../library/Products/productsBase';

let assert = require('chai').assert;

const products = new ProductBase();

describe('Products', () => {
    describe('Products Base Library', () => {

        it('Should create a new product', async () => {
            //let result = await products.createProduct('Test Product', 'This is a test item', 'thumbnail.png', 'Dispatches in 2-4 days', 0, false, 10, new Date("2018-03-31 02:00:07.525+01"), new Date("2018-03-31 02:00:07.525+01"));
            //assert.equal(0, result.payload, result.msg);
        });

        it('Should get all products', async () => {
            let result = await products.getAllProducts();
            assert.isAbove(result.productList.length, 0, result.msg);
        });

        it('Should get default product using ID', async () => {

        });


        it('Should update the previously made product', async () => {

        });

        it('Should delete the previously made product', async () => {

        });

    });
});