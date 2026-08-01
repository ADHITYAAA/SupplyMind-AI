import rackRepository from "./rack.repository.js";
import zoneRepository from "../warehouse-zones/zone.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class RackService {

    /*
    =====================================
    Create Rack
    =====================================
    */

    async createRack(rackData, userId) {

        /*
        =====================================
        Validate Zone
        =====================================
        */

        const zone = await zoneRepository.findById(
            rackData.zone
        );

        if (!zone) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Zone not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Rack
        =====================================
        */

        const existingRack =
            await rackRepository.findByZoneAndCode(

                rackData.zone,

                rackData.rackCode

            );

        if (existingRack) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Rack code already exists for this zone."
            );

        }

        /*
        =====================================
        Audit
        =====================================
        */

        rackData.createdBy = userId;

        return await rackRepository.create(
            rackData
        );

    }

    /*
    =====================================
    Get Rack By ID
    =====================================
    */

    async findRackById(rackId) {

        const rack = await rackRepository.findById(
            rackId
        );

        if (!rack) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Rack not found."
            );

        }

        return rack;

    }

    /*
    =====================================
    Get All Racks
    =====================================
    */

    async findAllRacks(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            zone: query.zone,

            status: query.status

        };

        return await rackRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Rack
    =====================================
    */

    async updateRack(

        rackId,

        rackData

    ) {

        const existingRack =
            await rackRepository.findById(
                rackId
            );

        if (!existingRack) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Rack not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Rack Code
        =====================================
        */

        if (rackData.rackCode) {

            const duplicate =
                await rackRepository.findByZoneAndCode(

                    existingRack.zone._id,

                    rackData.rackCode

                );

            if (

                duplicate &&

                duplicate._id.toString() !== rackId

            ) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Rack code already exists for this zone."

                );

            }

        }

        return await rackRepository.update(

            rackId,

            rackData

        );

    }

    /*
    =====================================
    Delete Rack
    =====================================
    */

    async deleteRack(rackId) {

        const rack =
            await rackRepository.delete(
                rackId
            );

        if (!rack) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Rack not found."
            );

        }

        return rack;

    }

}

export default new RackService();