import zoneService from "./zone.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ZoneController {

    /*
    =====================================
    Create Zone
    =====================================
    */

    createZone = asyncHandler(async (req, res) => {

        const zone = await zoneService.createZone(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Zone created successfully.",

                zone

            )

        );

    });

    /*
    =====================================
    Get Zone By ID
    =====================================
    */

    getZoneById = asyncHandler(async (req, res) => {

        const zone = await zoneService.findZoneById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Zone fetched successfully.",

                zone

            )

        );

    });

    /*
    =====================================
    Get All Zones
    =====================================
    */

    getAllZones = asyncHandler(async (req, res) => {

        const zones = await zoneService.findAllZones(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Zones fetched successfully.",

                zones

            )

        );

    });

    /*
    =====================================
    Update Zone
    =====================================
    */

    updateZone = asyncHandler(async (req, res) => {

        const zone = await zoneService.updateZone(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Zone updated successfully.",

                zone

            )

        );

    });

    /*
    =====================================
    Delete Zone
    =====================================
    */

    deleteZone = asyncHandler(async (req, res) => {

        await zoneService.deleteZone(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Zone deleted successfully."

            )

        );

    });

}

export default new ZoneController();