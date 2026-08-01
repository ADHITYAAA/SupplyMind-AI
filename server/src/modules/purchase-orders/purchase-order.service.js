import purchaseOrderRepository from "./purchase-order.repository.js";
import supplierRepository from "../suppliers/supplier.repository.js";
import warehouseRepository from "../warehouses/warehouse.repository.js";
import productRepository from "../products/product.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class PurchaseOrderService {

    /*
    =====================================
    Create Purchase Order
    =====================================
    */

    async createPurchaseOrder(purchaseOrderData, userId) {

        /*
        =====================================
        Check Duplicate PO Number
        =====================================
        */

        const existingPO =
            await purchaseOrderRepository.findByPONumber(
                purchaseOrderData.poNumber
            );

        if (existingPO) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Purchase Order number already exists."
            );

        }

        /*
        =====================================
        Validate Supplier
        =====================================
        */

        const supplier =
            await supplierRepository.findById(
                purchaseOrderData.supplier
            );

        if (!supplier) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Supplier not found."
            );

        }

        /*
        =====================================
        Validate Warehouse
        =====================================
        */

        const warehouse =
            await warehouseRepository.findById(
                purchaseOrderData.warehouse
            );

        if (!warehouse) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Warehouse not found."
            );

        }

        /*
        =====================================
        Validate Items
        =====================================
        */

        if (

            !purchaseOrderData.items ||

            purchaseOrderData.items.length === 0

        ) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Purchase Order must contain at least one product."

            );

        }

        let subtotal = 0;

        for (const item of purchaseOrderData.items) {

            const product =
                await productRepository.findById(
                    item.product
                );

            if (!product) {

                throw new ApiError(

                    HTTP_STATUS.NOT_FOUND,

                    "One or more products do not exist."

                );

            }

            if (item.quantity <= 0) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Quantity must be greater than zero."

                );

            }

            if (item.unitPrice < 0) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Unit price cannot be negative."

                );

            }

            /*
            =====================================
            Calculate Line Total
            =====================================
            */

            item.lineTotal =

                item.quantity *

                item.unitPrice;

            subtotal += item.lineTotal;

        }

        /*
        =====================================
        Financial Calculations
        =====================================
        */

        purchaseOrderData.subtotal = subtotal;

        purchaseOrderData.tax =

            purchaseOrderData.tax || 0;

        purchaseOrderData.discount =

            purchaseOrderData.discount || 0;

        purchaseOrderData.totalAmount =

            subtotal +

            purchaseOrderData.tax -

            purchaseOrderData.discount;

        /*
        =====================================
        Audit
        =====================================
        */

        purchaseOrderData.createdBy = userId;

        return await purchaseOrderRepository.create(

            purchaseOrderData

        );

    }

    /*
    =====================================
    Get Purchase Order By ID
    =====================================
    */

    async findPurchaseOrderById(purchaseOrderId) {

        const purchaseOrder =
            await purchaseOrderRepository.findById(
                purchaseOrderId
            );

        if (!purchaseOrder) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Purchase Order not found."

            );

        }

        return purchaseOrder;

    }

    /*
    =====================================
    Get All Purchase Orders
    =====================================
    */

    async findAllPurchaseOrders(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            supplier: query.supplier,

            warehouse: query.warehouse,

            status: query.status

        };

        return await purchaseOrderRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Purchase Order
    =====================================
    */

    async updatePurchaseOrder(

        purchaseOrderId,

        purchaseOrderData

    ) {

        if (purchaseOrderData.poNumber) {

            const duplicate =
                await purchaseOrderRepository.findByPONumberExcludingId(

                    purchaseOrderData.poNumber,

                    purchaseOrderId

                );

            if (duplicate) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Purchase Order number already exists."

                );

            }

        }

        const purchaseOrder =
            await purchaseOrderRepository.update(

                purchaseOrderId,

                purchaseOrderData

            );

        if (!purchaseOrder) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Purchase Order not found."

            );

        }

        return purchaseOrder;

    }

    /*
    =====================================
    Delete Purchase Order
    =====================================
    */

    async deletePurchaseOrder(purchaseOrderId) {

        const purchaseOrder =
            await purchaseOrderRepository.delete(
                purchaseOrderId
            );

        if (!purchaseOrder) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Purchase Order not found."

            );

        }

        return purchaseOrder;

    }

}

export default new PurchaseOrderService();