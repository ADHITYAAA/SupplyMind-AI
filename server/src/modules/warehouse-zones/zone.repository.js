import Zone from "./zone.model.js";
import buildPagination from "../../common/utils/pagination.js";

class ZoneRepository {

    /*
    =====================================
    Create Zone
    =====================================
    */

    async create(zoneData) {

        return await Zone.create(zoneData);

    }

    /*
    =====================================
    Find Zone By ID
    =====================================
    */

    async findById(zoneId) {

        return await Zone.findById(zoneId)

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
            )

            .populate(
                "createdBy",
                "fullName email"
            );

    }

    /*
    =====================================
    Find Zone By Warehouse & Code
    =====================================
    */

    async findByWarehouseAndCode(

        warehouseId,

        zoneCode

    ) {

        return await Zone.findOne({

            warehouse: warehouseId,

            zoneCode

        });

    }

    /*
    =====================================
    Get All Zones
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

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
        Zone Type Filter
        =====================================
        */

        if (filters.zoneType) {

            query.zoneType = filters.zoneType;

        }

        /*
        =====================================
        Status Filter
        =====================================
        */

        if (filters.status) {

            query.status = filters.status;

        }

        const zones = await Zone.find(query)

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
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

        const total = await Zone.countDocuments(query);

        return {

            zones,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Zone
    =====================================
    */

    async update(

        zoneId,

        zoneData

    ) {

        return await Zone.findByIdAndUpdate(

            zoneId,

            zoneData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Zone
    =====================================
    */

    async delete(zoneId) {

        return await Zone.findByIdAndDelete(

            zoneId

        );

    }

}

export default new ZoneRepository();