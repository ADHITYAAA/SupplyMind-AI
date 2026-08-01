import PurchaseOrder from "./purchase-order.model.js";
import buildPagination from "../../common/utils/pagination.js";

class PurchaseOrderRepository {

    /*
    =====================================
    Create Purchase Order
    =====================================
    */

    async create(purchaseOrderData) {

        return await PurchaseOrder.create(
            purchaseOrderData
        );

    }

    /*
    =====================================
    Find Purchase Order By ID
    =====================================
    */

    async findById(purchaseOrderId) {

        return await PurchaseOrder.findById(
            purchaseOrderId
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
                "fullName email"
            );

    }

    /*
    =====================================
    Find Purchase Order By Number
    =====================================
    */

    async findByPONumber(poNumber) {

        return await PurchaseOrder.findOne({

            poNumber

        });

    }

    /*
    =====================================
    Find PO Number Excluding Current
    =====================================
    */

    async findByPONumberExcludingId(

        poNumber,

        purchaseOrderId

    ) {

        return await PurchaseOrder.findOne({

            poNumber,

            _id: {

                $ne: purchaseOrderId

            }

        });

    }

    /*
    =====================================
    Get All Purchase Orders
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

        const purchaseOrders =
            await PurchaseOrder.find(query)

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

        const total =
            await PurchaseOrder.countDocuments(
                query
            );

        return {

            purchaseOrders,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Purchase Order
    =====================================
    */

    async update(

        purchaseOrderId,

        purchaseOrderData

    ) {

        return await PurchaseOrder.findByIdAndUpdate(

            purchaseOrderId,

            purchaseOrderData,

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
    Delete Purchase Order
    =====================================
    */

    async delete(purchaseOrderId) {

        return await PurchaseOrder.findByIdAndDelete(

            purchaseOrderId

        );

    }

}

export default new PurchaseOrderRepository();