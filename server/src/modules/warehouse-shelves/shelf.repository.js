import Shelf from "./shelf.model.js";
import buildPagination from "../../common/utils/pagination.js";

class ShelfRepository {

    /*
    =====================================
    Create Shelf
    =====================================
    */

    async create(shelfData) {

        return await Shelf.create(shelfData);

    }

    /*
    =====================================
    Find Shelf By ID
    =====================================
    */

    async findById(shelfId) {

        return await Shelf.findById(shelfId)

            .populate(
                "rack",
                "rackName rackCode"
            )

            .populate(
                "createdBy",
                "fullName email"
            );

    }

    /*
    =====================================
    Find Shelf By Rack & Code
    =====================================
    */

    async findByRackAndCode(rackId, shelfCode) {

        return await Shelf.findOne({

            rack: rackId,

            shelfCode

        });

    }

    /*
    =====================================
    Get All Shelves
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        if (filters.rack) {

            query.rack = filters.rack;

        }

        if (filters.status) {

            query.status = filters.status;

        }

        const shelves = await Shelf.find(query)

            .populate(
                "rack",
                "rackName rackCode"
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

        const total = await Shelf.countDocuments(query);

        return {

            shelves,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Shelf
    =====================================
    */

    async update(shelfId, shelfData) {

        return await Shelf.findByIdAndUpdate(

            shelfId,

            shelfData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "rack",
                "rackName rackCode"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Shelf
    =====================================
    */

    async delete(shelfId) {

        return await Shelf.findByIdAndDelete(

            shelfId

        );

    }

}

export default new ShelfRepository();