import warehouseRepository from "./warehouse.repository.js";
import userRepository from "../users/user.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class WarehouseService {

    /*
    =====================================
    Create Warehouse
    =====================================
    */

    async createWarehouse(warehouseData, userId) {

        /*
        =====================================
        Check Duplicate Warehouse Code
        =====================================
        */

        const warehouseExists =
            await warehouseRepository.findByWarehouseCode(
                warehouseData.warehouseCode
            );

        if (warehouseExists) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Warehouse code already exists."
            );

        }

        /*
        =====================================
        Check Warehouse Manager Exists
        =====================================
        */

        if (warehouseData.warehouseManager) {

            const manager =
                await userRepository.findById(
                    warehouseData.warehouseManager
                );

            if (!manager) {

                throw new ApiError(
                    HTTP_STATUS.NOT_FOUND,
                    "Warehouse manager not found."
                );

            }

        }

        /*
        =====================================
        Set Created By
        =====================================
        */

        warehouseData.createdBy = userId;

        return await warehouseRepository.create(
            warehouseData
        );

    }

    /*
    =====================================
    Get Warehouse By ID
    =====================================
    */

    async findWarehouseById(warehouseId) {

        const warehouse =
            await warehouseRepository.findById(
                warehouseId
            );

        if (!warehouse) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Warehouse not found."
            );

        }

        return warehouse;

    }

    /*
    =====================================
    Get All Warehouses
    =====================================
    */

    async findAllWarehouses(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            search: query.search,

            status: query.status

        };

        return await warehouseRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Warehouse
    =====================================
    */

    async updateWarehouse(
        warehouseId,
        warehouseData
    ) {

        /*
        =====================================
        Check Duplicate Warehouse Code
        =====================================
        */

        if (warehouseData.warehouseCode) {

            const duplicate =
                await warehouseRepository.findByWarehouseCodeExcludingId(

                    warehouseData.warehouseCode,

                    warehouseId

                );

            if (duplicate) {

                throw new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Warehouse code already exists."
                );

            }

        }

        /*
        =====================================
        Check Warehouse Manager Exists
        =====================================
        */

        if (warehouseData.warehouseManager) {

            const manager =
                await userRepository.findById(
                    warehouseData.warehouseManager
                );

            if (!manager) {

                throw new ApiError(
                    HTTP_STATUS.NOT_FOUND,
                    "Warehouse manager not found."
                );

            }

        }

        const warehouse =
            await warehouseRepository.update(

                warehouseId,

                warehouseData

            );

        if (!warehouse) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Warehouse not found."
            );

        }

        return warehouse;

    }

    /*
    =====================================
    Delete Warehouse
    =====================================
    */

    async deleteWarehouse(
        warehouseId
    ) {

        const warehouse =
            await warehouseRepository.delete(
                warehouseId
            );

        if (!warehouse) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Warehouse not found."
            );

        }

        return warehouse;

    }

}

export default new WarehouseService();