import Bin from "./bin.model.js";
import Shelf from "../warehouse-shelves/shelf.model.js";
import Rack from "../warehouse-racks/rack.model.js";
import Zone from "../warehouse-zones/zone.model.js";

import buildPagination from "../../common/utils/pagination.js";

class BinRepository {

    /*
    =====================================
    Create Bin
    =====================================
    */

    async create(binData) {

        return await Bin.create(binData);

    }

    /*
    =====================================
    Find Bin By ID
    =====================================
    */

    async findById(binId) {

        return await Bin.findById(binId)

            .populate(
                "shelf",
                "shelfName shelfCode level"
            )

            .populate(
                "createdBy",
                "fullName email"
            );

    }

    /*
    =====================================
    Find Bin With Complete Hierarchy
    =====================================
    */

    async findHierarchy(binId) {

        const bin = await Bin.findById(binId);

        if (!bin) {

            return null;

        }

        const shelf = await Shelf.findById(bin.shelf);

        const rack = await Rack.findById(shelf.rack);

        const zone = await Zone.findById(rack.zone);

        return {

            bin,

            shelf,

            rack,

            zone,

            warehouse: zone.warehouse

        };

    }

    /*
    =====================================
    Find Bin By Shelf & Code
    =====================================
    */

    async findByShelfAndCode(
        shelfId,
        binCode
    ) {

        return await Bin.findOne({

            shelf: shelfId,

            binCode

        });

    }

    /*
    =====================================
    Get All Bins
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        if (filters.shelf) {

            query.shelf = filters.shelf;

        }

        if (filters.status) {

            query.status = filters.status;

        }

        const bins = await Bin.find(query)

            .populate(
                "shelf",
                "shelfName shelfCode level"
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

        const total = await Bin.countDocuments(query);

        return {

            bins,

            pagination: buildPagination(
                total,
                page,
                limit
            )

        };

    }

    /*
    =====================================
    Update Bin
    =====================================
    */

    async update(
        binId,
        binData
    ) {

        return await Bin.findByIdAndUpdate(

            binId,

            binData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "shelf",
                "shelfName shelfCode level"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Bin
    =====================================
    */

    async delete(binId) {

        return await Bin.findByIdAndDelete(
            binId
        );

    }

}

export default new BinRepository();