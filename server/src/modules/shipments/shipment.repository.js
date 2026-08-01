import Shipment from "./shipment.model.js";
import buildPagination from "../../common/utils/pagination.js";

class ShipmentRepository {

    /*
    =====================================
    Create Shipment
    =====================================
    */

    async create(shipmentData) {

        return await Shipment.create(shipmentData);

    }

    /*
    =====================================
    Find Shipment By ID
    =====================================
    */

    async findById(shipmentId) {

        return await Shipment.findById(shipmentId)

            .populate(
                "supplier",
                "supplierName supplierCode"
            )

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
            )

            .populate(
                "items.product",
                "productName productCode category"
            )

            .populate(
                "createdBy",
                "fullName email"
            );

    }

    /*
    =====================================
    Find Shipment By Number
    =====================================
    */

    async findByShipmentNumber(shipmentNumber) {

        return await Shipment.findOne({

            shipmentNumber

        });

    }

    /*
    =====================================
    Find Shipment Number Excluding Current
    =====================================
    */

    async findByShipmentNumberExcludingId(

        shipmentNumber,

        shipmentId

    ) {

        return await Shipment.findOne({

            shipmentNumber,

            _id: {

                $ne: shipmentId

            }

        });

    }

    /*
    =====================================
    Get All Shipments
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        /*
        =====================================
        Supplier Filter
        =====================================
        */

        if (filters.supplier) {

            query.supplier = filters.supplier;

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
        Status Filter
        =====================================
        */

        if (filters.status) {

            query.status = filters.status;

        }

        const shipments = await Shipment.find(query)

            .populate(
                "supplier",
                "supplierName supplierCode"
            )

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

        const total = await Shipment.countDocuments(query);

        return {

            shipments,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Shipment
    =====================================
    */

    async update(

        shipmentId,

        shipmentData

    ) {

        return await Shipment.findByIdAndUpdate(

            shipmentId,

            shipmentData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "supplier",
                "supplierName supplierCode"
            )

            .populate(
                "warehouse",
                "warehouseName warehouseCode"
            )

            .populate(
                "items.product",
                "productName productCode category"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Shipment
    =====================================
    */

    async delete(shipmentId) {

        return await Shipment.findByIdAndDelete(

            shipmentId

        );

    }

}

export default new ShipmentRepository();