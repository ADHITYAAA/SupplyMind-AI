import zoneRepository from "./zone.repository.js";
import warehouseRepository from "../warehouses/warehouse.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ZoneService {

    /*
    =====================================
    Create Zone
    =====================================
    */

    async createZone(zoneData, userId) {

        /*
        =====================================
        Validate Warehouse
        =====================================
        */

        const warehouse = await warehouseRepository.findById(
            zoneData.warehouse
        );

        if (!warehouse) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Warehouse not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Zone
        =====================================
        */

        const existingZone =
            await zoneRepository.findByWarehouseAndCode(

                zoneData.warehouse,

                zoneData.zoneCode

            );

        if (existingZone) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Zone code already exists for this warehouse."
            );

        }

        /*
        =====================================
        Audit
        =====================================
        */

        zoneData.createdBy = userId;

        return await zoneRepository.create(
            zoneData
        );

    }

    /*
    =====================================
    Get Zone By ID
    =====================================
    */

    async findZoneById(zoneId) {

        const zone =
            await zoneRepository.findById(
                zoneId
            );

        if (!zone) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Zone not found."
            );

        }

        return zone;

    }

    /*
    =====================================
    Get All Zones
    =====================================
    */

    async findAllZones(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            warehouse: query.warehouse,

            zoneType: query.zoneType,

            status: query.status

        };

        return await zoneRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Zone
    =====================================
    */

    async updateZone(

        zoneId,

        zoneData

    ) {

        const existingZone =
            await zoneRepository.findById(
                zoneId
            );

        if (!existingZone) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Zone not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Zone Code
        =====================================
        */

        if (zoneData.zoneCode) {

            const duplicate =
                await zoneRepository.findByWarehouseAndCode(

                    existingZone.warehouse._id,

                    zoneData.zoneCode

                );

            if (

                duplicate &&

                duplicate._id.toString() !== zoneId

            ) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Zone code already exists for this warehouse."

                );

            }

        }

        return await zoneRepository.update(

            zoneId,

            zoneData

        );

    }

    /*
    =====================================
    Delete Zone
    =====================================
    */

    async deleteZone(zoneId) {

        const zone =
            await zoneRepository.delete(
                zoneId
            );

        if (!zone) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Zone not found."
            );

        }

        return zone;

    }

}

export default new ZoneService();