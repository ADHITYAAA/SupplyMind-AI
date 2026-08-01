import Rack from "./rack.model.js";
import buildPagination from "../../common/utils/pagination.js";

class RackRepository {

    /*
    =====================================
    Create Rack
    =====================================
    */

    async create(rackData) {

        return await Rack.create(rackData);

    }

    /*
    =====================================
    Find Rack By ID
    =====================================
    */

    async findById(rackId) {

        return await Rack.findById(rackId)

            .populate(
                "zone",
                "zoneName zoneCode zoneType"
            )

            .populate(
                "createdBy",
                "fullName email"
            );

    }

    /*
    =====================================
    Find Rack By Zone & Code
    =====================================
    */

    async findByZoneAndCode(
        zoneId,
        rackCode
    ) {

        return await Rack.findOne({

            zone: zoneId,

            rackCode

        });

    }

    /*
    =====================================
    Get All Racks
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        /*
        =====================================
        Zone Filter
        =====================================
        */

        if (filters.zone) {

            query.zone = filters.zone;

        }

        /*
        =====================================
        Status Filter
        =====================================
        */

        if (filters.status) {

            query.status = filters.status;

        }

        const racks = await Rack.find(query)

            .populate(
                "zone",
                "zoneName zoneCode zoneType"
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

        const total = await Rack.countDocuments(query);

        return {

            racks,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Rack
    =====================================
    */

    async update(
        rackId,
        rackData
    ) {

        return await Rack.findByIdAndUpdate(

            rackId,

            rackData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "zone",
                "zoneName zoneCode zoneType"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Rack
    =====================================
    */

    async delete(rackId) {

        return await Rack.findByIdAndDelete(

            rackId

        );

    }

}

export default new RackRepository();