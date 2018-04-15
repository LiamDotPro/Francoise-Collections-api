require('dotenv').config();
import 'babel-polyfill';
// Database Class.
import db from '../../models/index';
// Products model
const inventories = db.inventory;


export default class InventoriesBase {

    /**
     * Creates a new instance of inventory.
     * @param productIdentifer
     * @param available
     * @param sold
     * @param hold
     * @param onOrder
     * @returns {Promise.<*>}
     */
    async createNewInventory(productIdentifer, available, sold, hold, onOrder) {

        if (isNaN(productIdentifer)) {
            return {msg: 'No product Identifier was passed.', payload: 1};
        }

        try {
            let createdInventory = await inventories.create({
                productIdentifer: productIdentifer,
                available: available,
                sold: sold,
                hold: hold,
                onOrder: onOrder
            });

            return {msg: 'Success', payload: 0, insertedId: createdInventory.dataValues.id};
        } catch (e) {
            return {msg: 'An error occurred while trying to create a new inventory', payload: 1};
        }

    }

    /**
     * Updates an inventory using an id.
     * @param id
     * @param productIdentifer
     * @param available
     * @param sold
     * @param hold
     * @param onOrder
     */
    async updateInventoryById(id, productIdentifer, available, sold, hold, onOrder) {

        try {
            let updatedInventory = await !!inventories.update({
                productIdentifer: productIdentifer,
                available: available,
                sold: sold,
                hold: hold,
                onOrder: onOrder
            }, {
                where: {
                    id: id
                }
            });

            if (!updatedInventory) {
                return {msg: 'The inventory was not able to be updated...', payload: 1};
            }

            return {msg: 'Success', payload: 0};
        } catch (e) {
            return {msg: 'An error occurred while updating the inventory information.', payload: 1};
        }

    }

    /**
     * Updates an inventory using a productId.
     * @param productIdentifer
     * @param available
     * @param sold
     * @param hold
     * @param onOrder
     */
    async updateInventoryByProductId(productIdentifer, available, sold, hold, onOrder) {

        try {
            let updatedInventory = await inventories.update({
                available: available,
                sold: sold,
                hold: hold,
                onOrder: onOrder
            }, {
                where: {
                    productIdentifer: productIdentifer
                }
            });
            return {msg: 'Success', payload: 0};
        } catch (e) {
            return {msg: 'An error occurred while updating the inventory information.', payload: 1};
        }

    }

    /**
     * Gets all of the available inventory listings.
     */
    async getAllInventories() {

        try {
            let allInventories = await inventories.findAll();

            if (allInventories.length <= 0) {
                return {
                    msg: 'No inventories found..',
                    payload: 1
                }
            }

            let inventoryList = allInventories.map((item, index, arr) => {
                return {
                    inventory: item.dataValues,
                    index: index
                };
            });

            return {
                msg: 'Success',
                payload: 0,
                inventoryList: inventoryList
            }

        } catch (e) {
            return {
                msg: 'An error occurred while trying to get the inventory list',
                payload: 1
            }
        }

    }

    /**
     * Gets an inventory using id.
     * @param id
     */
    async getInventoryById(id) {

        if (!id) {
            return {msg: 'No id specified..', payload: 1};
        }

        try {
            let inventory = await inventories.findAll({
                where: {
                    id: id
                }
            });

            if (inventory.length <= 0) {
                return {msg: 'No inventory was found..', payload: 1};
            }

            return {msg: 'Success', payload: 0, inventory: inventory[0].dataValues};

        } catch (e) {
            return {msg: 'An error occurred while trying to retrieve a inventory..', payload: 1};
        }

    }

    /**
     * Gets an inventory using the product Id.
     * @param productId
     */
    async getInventoryByProductId(productId) {

        if (!productId) {
            return {msg: 'No product id specified..', payload: 1};
        }

        try {
            let inventory = await inventories.findAll({
                where: {
                    productIdentifer: productId
                }
            });

            if (inventory.length <= 0) {
                return {msg: 'No inventory was found..', payload: 1};
            }

            return {msg: 'Success', payload: 0, inventory: inventory[0].dataValues};

        } catch (e) {
            return {msg: 'An error occurred while trying to retrieve a inventory..', payload: 1};
        }

    }

    /**
     * Deletes an inventory based on Id.
     * @param id
     */
    async deleteInventoryById(id) {

        if (!id) {
            return {msg: 'No id specified..', payload: 1};
        }

        try {
            return !!await inventories.destroy({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return false;
        }

    }

    /**
     * Deletes an inventory based on product Id.
     * @param productId
     */
    async deleteInventoryByProductId(productId) {

        if (!productId) {
            return {msg: 'No product identifier specified..', payload: 1};
        }

        try {
            return !!await inventories.destroy({
                where: {
                    productIdentifer: productId
                }
            })
        } catch (e) {
            return false;
        }

    }

}
