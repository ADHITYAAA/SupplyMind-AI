import rackService from "./rack.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class RackController {

    /*
    =====================================
    Create Rack
    =====================================
    */

    createRack = asyncHandler(async (req, res) => {

        const rack = await rackService.createRack(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Rack created successfully.",

                rack

            )

        );

    });

    /*
    =====================================
    Get Rack By ID
    =====================================
    */

    getRackById = asyncHandler(async (req, res) => {

        const rack = await rackService.findRackById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Rack fetched successfully.",

                rack

            )

        );

    });

    /*
    =====================================
    Get All Racks
    =====================================
    */

    getAllRacks = asyncHandler(async (req, res) => {

        const racks = await rackService.findAllRacks(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Racks fetched successfully.",

                racks

            )

        );

    });

    /*
    =====================================
    Update Rack
    =====================================
    */

    updateRack = asyncHandler(async (req, res) => {

        const rack = await rackService.updateRack(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Rack updated successfully.",

                rack

            )

        );

    });

    /*
    =====================================
    Delete Rack
    =====================================
    */

    deleteRack = asyncHandler(async (req, res) => {

        await rackService.deleteRack(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Rack deleted successfully."

            )

        );

    });

}

export default new RackController();