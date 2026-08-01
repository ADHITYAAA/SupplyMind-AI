import shelfRepository from "./shelf.repository.js";
import rackRepository from "../warehouse-racks/rack.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ShelfService {

    /*
    =====================================
    Create Shelf
    =====================================
    */

    async createShelf(shelfData, userId) {

        /*
        =====================================
        Validate Rack
        =====================================
        */

        const rack = await rackRepository.findById(
            shelfData.rack
        );

        if (!rack) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Rack not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Shelf
        =====================================
        */

        const existingShelf =
            await shelfRepository.findByRackAndCode(

                shelfData.rack,

                shelfData.shelfCode

            );

        if (existingShelf) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Shelf code already exists for this rack."

            );

        }

        /*
        =====================================
        Audit
        =====================================
        */

        shelfData.createdBy = userId;

        return await shelfRepository.create(
            shelfData
        );

    }

    /*
    =====================================
    Get Shelf By ID
    =====================================
    */

    async findShelfById(shelfId) {

        const shelf =
            await shelfRepository.findById(
                shelfId
            );

        if (!shelf) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Shelf not found."

            );

        }

        return shelf;

    }

    /*
    =====================================
    Get All Shelves
    =====================================
    */

    async findAllShelves(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            rack: query.rack,

            status: query.status

        };

        return await shelfRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Shelf
    =====================================
    */

    async updateShelf(

        shelfId,

        shelfData

    ) {

        const existingShelf =
            await shelfRepository.findById(
                shelfId
            );

        if (!existingShelf) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Shelf not found."

            );

        }

        /*
        =====================================
        Prevent Duplicate Shelf Code
        =====================================
        */

        if (shelfData.shelfCode) {

            const duplicate =
                await shelfRepository.findByRackAndCode(

                    existingShelf.rack._id,

                    shelfData.shelfCode

                );

            if (

                duplicate &&

                duplicate._id.toString() !== shelfId

            ) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Shelf code already exists for this rack."

                );

            }

        }

        return await shelfRepository.update(

            shelfId,

            shelfData

        );

    }

    /*
    =====================================
    Delete Shelf
    =====================================
    */

    async deleteShelf(shelfId) {

        const shelf =
            await shelfRepository.delete(
                shelfId
            );

        if (!shelf) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Shelf not found."

            );

        }

        return shelf;

    }

}

export default new ShelfService();