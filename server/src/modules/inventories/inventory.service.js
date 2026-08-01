import inventoryRepository from "./inventory.repository.js";
import productRepository from "../products/product.repository.js";
import warehouseRepository from "../warehouses/warehouse.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class InventoryService {

    /*
    =====================================
    Create Inventory
    =====================================
    */

    async createInventory(inventoryData, userId) {

        /*
        =====================================
        Check Product Exists
        =====================================
        */

        const product = await productRepository.findById(
            inventoryData.product
        );

        if (!product) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Product not found."
            );

        }

        /*
        =====================================
        Check Warehouse Exists
        =====================================
        */

        const warehouse = await warehouseRepository.findById(
            inventoryData.warehouse
        );

        if (!warehouse) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Warehouse not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Inventory
        =====================================
        */

        const existingInventory =
            await inventoryRepository.findByProductAndWarehouse(

                inventoryData.product,

                inventoryData.warehouse

            );

        if (existingInventory) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Inventory already exists for this product in this warehouse."
            );

        }

        /*
        =====================================
        Auto Calculate Available Stock
        =====================================
        */

        inventoryData.availableStock =

            inventoryData.currentStock -

            inventoryData.reservedStock;

        /*
        =====================================
        Auto Calculate Stock Status
        =====================================
        */

        if (inventoryData.currentStock <= 0) {

            inventoryData.stockStatus = "Out Of Stock";

        }

        else if (

            inventoryData.currentStock <=

            inventoryData.reorderLevel

        ) {

            inventoryData.stockStatus = "Low Stock";

        }

        else {

            inventoryData.stockStatus = "In Stock";

        }

        /*
        =====================================
        Audit
        =====================================
        */

        inventoryData.createdBy = userId;

        inventoryData.lastStockUpdate = new Date();

        return await inventoryRepository.create(
            inventoryData
        );

    }

    /*
    =====================================
    Get Inventory By ID
    =====================================
    */

    async findInventoryById(inventoryId) {

        const inventory =
            await inventoryRepository.findById(
                inventoryId
            );

        if (!inventory) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Inventory not found."
            );

        }

        return inventory;

    }

    /*
    =====================================
    Get All Inventories
    =====================================
    */

    async findAllInventories(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            product: query.product,

            warehouse: query.warehouse,

            stockStatus: query.stockStatus

        };

        return await inventoryRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Inventory
    =====================================
    */

    async updateInventory(

        inventoryId,

        inventoryData

    ) {

        /*
        =====================================
        Auto Calculate Available Stock
        =====================================
        */

        if (

            inventoryData.currentStock !== undefined ||

            inventoryData.reservedStock !== undefined

        ) {

            const existingInventory =
                await inventoryRepository.findById(
                    inventoryId
                );

            if (!existingInventory) {

                throw new ApiError(
                    HTTP_STATUS.NOT_FOUND,
                    "Inventory not found."
                );

            }

            const currentStock =

                inventoryData.currentStock ??

                existingInventory.currentStock;

            const reservedStock =

                inventoryData.reservedStock ??

                existingInventory.reservedStock;

            inventoryData.availableStock =

                currentStock -

                reservedStock;

            const reorderLevel =

                inventoryData.reorderLevel ??

                existingInventory.reorderLevel;

            if (currentStock <= 0) {

                inventoryData.stockStatus = "Out Of Stock";

            }

            else if (currentStock <= reorderLevel) {

                inventoryData.stockStatus = "Low Stock";

            }

            else {

                inventoryData.stockStatus = "In Stock";

            }

            inventoryData.lastStockUpdate = new Date();

        }

        const inventory =
            await inventoryRepository.update(

                inventoryId,

                inventoryData

            );

        if (!inventory) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Inventory not found."
            );

        }

        return inventory;

    }

    /*
    =====================================
    Delete Inventory
    =====================================
    */

    async deleteInventory(inventoryId) {

        const inventory =
            await inventoryRepository.delete(
                inventoryId
            );

        if (!inventory) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Inventory not found."
            );

        }

        return inventory;

    }

}

export default new InventoryService();