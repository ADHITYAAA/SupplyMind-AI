import shipmentRepository from "./shipment.repository.js";
import supplierRepository from "../suppliers/supplier.repository.js";
import warehouseRepository from "../warehouses/warehouse.repository.js";
import productRepository from "../products/product.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ShipmentService {

    /*
    =====================================
    Create Shipment
    =====================================
    */

    async createShipment(shipmentData, userId) {

        /*
        =====================================
        Duplicate Shipment Number
        =====================================
        */

        const shipmentExists =
            await shipmentRepository.findByShipmentNumber(
                shipmentData.shipmentNumber
            );

        if (shipmentExists) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Shipment number already exists."
            );

        }

        /*
        =====================================
        Validate Supplier
        =====================================
        */

        const supplier =
            await supplierRepository.findById(
                shipmentData.supplier
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
                shipmentData.warehouse
            );

        if (!warehouse) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Warehouse not found."
            );

        }

        /*
        =====================================
        Validate Shipment Items
        =====================================
        */

        if (

            !shipmentData.items ||

            shipmentData.items.length === 0

        ) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Shipment must contain at least one product."

            );

        }

        for (const item of shipmentData.items) {

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

                    "Product quantity must be greater than zero."

                );

            }

        }

        /*
        =====================================
        Audit
        =====================================
        */

        shipmentData.createdBy = userId;

        return await shipmentRepository.create(
            shipmentData
        );

    }

    /*
    =====================================
    Get Shipment By ID
    =====================================
    */

    async findShipmentById(shipmentId) {

        const shipment =
            await shipmentRepository.findById(
                shipmentId
            );

        if (!shipment) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Shipment not found."

            );

        }

        return shipment;

    }

    /*
    =====================================
    Get All Shipments
    =====================================
    */

    async findAllShipments(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            supplier: query.supplier,

            warehouse: query.warehouse,

            status: query.status

        };

        return await shipmentRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Shipment
    =====================================
    */

    async updateShipment(

        shipmentId,

        shipmentData

    ) {

        /*
        =====================================
        Duplicate Shipment Number
        =====================================
        */

        if (shipmentData.shipmentNumber) {

            const duplicate =
                await shipmentRepository.findByShipmentNumberExcludingId(

                    shipmentData.shipmentNumber,

                    shipmentId

                );

            if (duplicate) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Shipment number already exists."

                );

            }

        }

        const shipment =
            await shipmentRepository.update(

                shipmentId,

                shipmentData

            );

        if (!shipment) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Shipment not found."

            );

        }

        return shipment;

    }

    /*
    =====================================
    Delete Shipment
    =====================================
    */

    async deleteShipment(shipmentId) {

        const shipment =
            await shipmentRepository.delete(
                shipmentId
            );

        if (!shipment) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Shipment not found."

            );

        }

        return shipment;

    }

}

export default new ShipmentService();