require('dotenv').config();
import 'babel-polyfill';
// Database Class.
import db from '../../models/index';
// Products model
const products = db.product;

export default class productsBase {
    constructor() {
        if (process.env.ENVIROMENT === 'production' && new.target === productsBase) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     * Gets all products from the database.
     */
    async getAllProducts() {
        try {
            let allProducts = await products.findAll();

            if (allProducts.length <= 0) {
                return {
                    msg: 'No products found..',
                    payload: 1
                }
            }

            let productList = allProducts.map((item, index, arr) => {
                return {
                    product: item.dataValues,
                    index: index
                };
            });

            return {
                msg: 'Success',
                payload: 0,
                productList: productList
            }
        } catch (e) {
            return {
                msg: 'An error occurred while trying to get the products list',
                payload: 1
            }
        }
    }

    /**
     * Gets a specific product by it's Unique Identifier.
     * @param id
     */
    async getProductById(id) {
        let product = await products.findAll({
            where: {
                id: id
            }
        });

        if (product.length <= 0) {
            return {
                msg: 'No product was found..',
                payload: 1
            }
        }

        return {msg: 'Success', payload: 0, product: product[0].dataValues};
    }

    /**
     * Creates a new instance of product.
     *
     * status: 0 draft, 1 live
     *
     * @param name
     * @param description
     * @param thumbnail
     * @param dispatchTime
     * @param status
     * @param eligibleForDiscount
     * @param productInventory
     * @param startSaleDate
     * @param endSaleDate
     */
    async createProduct(name, description, thumbnail, dispatchTime, status, eligibleForDiscount, productInventory, startSaleDate, endSaleDate) {
        try {
            let createdProduct = await products.create({
                productName: name,
                productDesc: description,
                productThumbnail: thumbnail,
                productDispatchTime: dispatchTime,
                status: status,
                eligibleForDiscount: eligibleForDiscount,
                productInventory: productInventory,
                startSale: startSaleDate,
                endSale: endSaleDate
            });

            return {msg: 'Success', payload: 0, insertedId: createdProduct.dataValues.id};
        } catch (e) {
            return {msg: 'An error occurred while trying to create a new product', payload: 1};
        }
    }

    /**
     * Gets a paginated partial view of the products catalog.
     * @todo Needs further testing to assure that pagination works as intended.
     * @param page
     */
    async getProductsByPagination(page) {
        try {
            let count = await products.findAndCountAll().then((data) => {
                return data.count;
            });

            const limit = 50;

            let pages = Math.ceil(count / limit);
            let offset = limit * (page - 1);

            let resultObjects = await products.findAll({
                order: [
                    ['id', 'DESC']
                ],
                limit: limit,
                offset: offset
            });

            if (resultObjects.length <= 0) {
                return {msg: 'There was no products found...', payload: 1};
            }

            let outputProducts = resultObjects.map((item, index) => {
                return item.dataValues;
            });

            return {
                msg: 'Success',
                payload: 0,
                pages: pages,
                count: count,
                products: outputProducts
            };
        } catch (e) {
            return {msg: 'An error occurred while trying get a set of paginated products..', payload: 1};
        }
    }

    /**
     * Update information about a product.
     * @param id
     * @param name
     * @param description
     * @param thumbnail
     * @param dispatchTime
     * @param status
     * @param eligibleForDiscount
     * @param productInventory
     * @param startSaleDate
     * @param endSaleDate
     */
    async updateProductById(id, name, description, thumbnail, dispatchTime, status, eligibleForDiscount, productInventory, startSaleDate, endSaleDate) {
        try {
            let updatedProduct = await !!products.update({
                    productName: name,
                    productDesc: description,
                    productThumbnail: thumbnail,
                    productDispatchTime: dispatchTime,
                    status: status,
                    eligibleForDiscount: eligibleForDiscount,
                    productInventory: productInventory,
                    startSale: startSaleDate,
                    endSale: endSaleDate
                },
                {
                    where: {
                        id: id
                    }
                });

            if (!updatedProduct) {
                return {msg: 'The product was not able to be updated.', payload: 1};
            }

            return {msg: 'Success', payload: 0};
        } catch (e) {
            return {msg: 'An error occurred while updating the product information.', payload: 1};
        }

    }

    /**
     * Soft delete a product.
     * @param id
     */
    async deleteProduct(id) {

        if (!id) {
            return {msg: 'No Id specified..', payload: 1};
        }

        try {
            return !!await products.destroy({
                where: {
                    id: id
                }
            });
        } catch (e) {
            return false;
        }

    }
}
