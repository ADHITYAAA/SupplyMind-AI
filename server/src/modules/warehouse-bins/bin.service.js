import binRepository from "./bin.repository.js";
import shelfRepository from "../warehouse-shelves/shelf.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class BinService {

    /*
    =====================================
    Create Bin
    =====================================
    */

    async createBin(binData, userId) {

        /*
        =====================================
        Validate Shelf
        =====================================
        */

        const shelf = await shelfRepository.findById(
            binData.shelf
        );

        if (!shelf) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Shelf not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Bin
        =====================================
        */

        const existingBin =
            await binRepository.findByShelfAndCode(

                binData.shelf,

                binData.binCode

            );

        if (existingBin) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Bin code already exists for this shelf."

            );

        }

        /*
        =====================================
        Capacity Validation
        =====================================
        */

        if (

            binData.occupiedCapacity >

            binData.capacity

        ) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Occupied capacity cannot exceed total capacity."

            );

        }

        /*
        =====================================
        Audit
        =====================================
        */

        binData.createdBy = userId;

        return await binRepository.create(

            binData

        );

    }

    /*
    =====================================
    Get Bin By ID
    =====================================
    */

    async findBinById(binId) {

        const bin =
            await binRepository.findById(
                binId
            );

        if (!bin) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Bin not found."

            );

        }

        return bin;

    }

    /*
    =====================================
    Get All Bins
    =====================================
    */

    async findAllBins(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            shelf: query.shelf,

            status: query.status

        };

        return await binRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Bin
    =====================================
    */

    async updateBin(

        binId,

        binData

    ) {

        const existingBin =
            await binRepository.findById(
                binId
            );

        if (!existingBin) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Bin not found."

            );

        }

        /*
        =====================================
        Duplicate Bin Code
        =====================================
        */

        if (binData.binCode) {

            const duplicate =
                await binRepository.findByShelfAndCode(

                    existingBin.shelf._id,

                    binData.binCode

                );

            if (

                duplicate &&

                duplicate._id.toString() !== binId

            ) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Bin code already exists for this shelf."

                );

            }

        }

        /*
        =====================================
        Capacity Validation
        =====================================
        */

        const capacity =
            binData.capacity ??
            existingBin.capacity;

        const occupied =
            binData.occupiedCapacity ??
            existingBin.occupiedCapacity;

        if (occupied > capacity) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Occupied capacity cannot exceed total capacity."

            );

        }

        return await binRepository.update(

            binId,

            binData

        );

    }

    /*
    =====================================
    Delete Bin
    =====================================
    */

    async deleteBin(binId) {

        const bin =
            await binRepository.delete(
                binId
            );

        if (!bin) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Bin not found."

            );

        }

        return bin;

    }

}

export default new BinService();