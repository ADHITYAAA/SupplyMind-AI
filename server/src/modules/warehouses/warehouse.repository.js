import Warehouse from "./warehouse.model.js";
import buildPagination from "../../common/utils/pagination.js";

class WarehouseRepository {

    /*
    =====================================
    Create Warehouse
    =====================================
    */

    async create(warehouseData) {

        return await Warehouse.create(warehouseData);

    }

    /*
    =====================================
    Find Warehouse By ID
    =====================================
    */

    async findById(warehouseId) {

        return await Warehouse.findById(warehouseId)
            .populate("warehouseManager", "fullName email employeeId")
            .populate("createdBy", "fullName email");

    }

    /*
    =====================================
    Find Warehouse By Code
    =====================================
    */

    async findByWarehouseCode(warehouseCode) {

        return await Warehouse.findOne({
            warehouseCode
        });

    }

    /*
    =====================================
    Find Warehouse Code Excluding Current
    =====================================
    */

    async findByWarehouseCodeExcludingId(
        warehouseCode,
        warehouseId
    ) {

        return await Warehouse.findOne({

            warehouseCode,

            _id: {
                $ne: warehouseId
            }

        });

    }

    /*
    =====================================
    Get All Warehouses
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        /*
        =====================================
        Search
        =====================================
        */

        if (filters.search) {

            query.$or = [

                {

                    warehouseName: {

                        $regex: filters.search,

                        $options: "i"

                    }

                },

                {

                    warehouseCode: {

                        $regex: filters.search,

                        $options: "i"

                    }

                }

            ];

        }

        /*
        =====================================
        Status Filter
        =====================================
        */

        if (filters.status) {

            query.status = filters.status;

        }

        const warehouses = await Warehouse.find(query)

            .populate(
                "warehouseManager",
                "fullName employeeId"
            )

            .populate(
                "createdBy",
                "fullName"
            )

            .sort({

                createdAt: -1

            })

            .skip(skip)

            .limit(limit);

        const total = await Warehouse.countDocuments(query);

        return {

            warehouses,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Warehouse
    =====================================
    */

    async update(warehouseId, warehouseData) {

        return await Warehouse.findByIdAndUpdate(

            warehouseId,

            warehouseData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "warehouseManager",
                "fullName employeeId"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Warehouse
    =====================================
    */

    async delete(warehouseId) {

        return await Warehouse.findByIdAndDelete(
            warehouseId
        );

    }

}

export default new WarehouseRepository();