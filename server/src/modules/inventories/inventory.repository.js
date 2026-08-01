import Inventory from "./inventory.model.js";
import buildPagination from "../../common/utils/pagination.js";

class InventoryRepository {

    /*
    =====================================
    Create Inventory
    =====================================
    */

    async create(inventoryData) {

        return await Inventory.create(inventoryData);

    }

    /*
    =====================================
    Find Inventory By ID
    =====================================
    */

    async findById(inventoryId) {

        return await Inventory.findById(inventoryId)

            .populate(
                "product",
                "productName productCode category brand"
            )

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
            )

            .populate(
                "bin",
                "binName binCode status"
            )

            .populate(
                "createdBy",
                "fullName email"
            );

    }

    /*
    =====================================
    Find By Product + Warehouse + Bin
    =====================================
    */

    async findByProductWarehouseAndBin(

        productId,

        warehouseId,

        binId = null

    ) {

        return await Inventory.findOne({

            product: productId,

            warehouse: warehouseId,

            bin: binId

        });

    }

    /*
    =====================================
    Get All Inventories
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        /*
        =====================================
        Product Filter
        =====================================
        */

        if (filters.product) {

            query.product = filters.product;

        }

        /*
        =====================================
        Warehouse Filter
        =====================================
        */

        if (filters.warehouse) {

            query.warehouse = filters.warehouse;

        }

        /*
        =====================================
        Bin Filter
        =====================================
        */

        if (filters.bin) {

            query.bin = filters.bin;

        }

        /*
        =====================================
        Stock Status Filter
        =====================================
        */

        if (filters.stockStatus) {

            query.stockStatus = filters.stockStatus;

        }

        const inventories = await Inventory.find(query)

            .populate(
                "product",
                "productName productCode category brand"
            )

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
            )

            .populate(
                "bin",
                "binName binCode status"
            )

            .populate(
                "createdBy",
                "fullName"
            )

            .sort({

                updatedAt: -1

            })

            .skip(skip)

            .limit(limit);

        const total = await Inventory.countDocuments(query);

        return {

            inventories,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Inventory
    =====================================
    */

    async update(

        inventoryId,

        inventoryData

    ) {

        return await Inventory.findByIdAndUpdate(

            inventoryId,

            inventoryData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "product",
                "productName productCode category brand"
            )

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
            )

            .populate(
                "bin",
                "binName binCode status"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Inventory
    =====================================
    */

    async delete(inventoryId) {

        return await Inventory.findByIdAndDelete(

            inventoryId

        );

    }

}

export default new InventoryRepository();