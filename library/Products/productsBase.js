require('dotenv').config();
import 'babel-polyfill';
// Database Class.
import db from '../../models/index';
// Products model
const products = db.products;

export default class productsBase {
    constructor() {
        if (process.env.ENVIROMENT === 'production' && new.target === productsBase) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     * Gets all products from the database.
     * @returns {Promise<void>}
     */
    async getAllProducts() {

    }

    /**
     * Gets a specific product by it's Unique Identifier.
     * @returns {Promise<void>}
     */
    async getProductById() {

    }

    /**
     * Creates a new instance of product.
     * @param name
     * @param description
     * @param thumbnail
     * @param dispatchTime
     * @param status
     * @param eligibleForDiscount
     * @param productInventory
     * @param startSaleDate
     * @param endSaleDate
     * @returns {Promise<void>}
     */
    async createProduct(name, description, thumbnail, dispatchTime, status, eligibleForDiscount, productInventory, startSaleDate, endSaleDate) {

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
     * @returns {Promise<void>}
     */
    async updateProductById(id, name, description, thumbnail, dispatchTime, status, eligibleForDiscount, productInventory, startSaleDate, endSaleDate) {

    }

    /**
     * Soft delete a product.
     * @param id
     * @returns {Promise<void>}
     */
    async deleteProduct(id) {

    }
}
