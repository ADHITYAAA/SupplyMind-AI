import shipmentService from "./shipment.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ShipmentController {

    /*
    =====================================
    Create Shipment
    =====================================
    */

    createShipment = asyncHandler(async (req, res) => {

        const shipment = await shipmentService.createShipment(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Shipment created successfully.",

                shipment

            )

        );

    });

    /*
    =====================================
    Get Shipment By ID
    =====================================
    */

    getShipmentById = asyncHandler(async (req, res) => {

        const shipment = await shipmentService.findShipmentById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shipment fetched successfully.",

                shipment

            )

        );

    });

    /*
    =====================================
    Get All Shipments
    =====================================
    */

    getAllShipments = asyncHandler(async (req, res) => {

        const shipments = await shipmentService.findAllShipments(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shipments fetched successfully.",

                shipments

            )

        );

    });

    /*
    =====================================
    Update Shipment
    =====================================
    */

    updateShipment = asyncHandler(async (req, res) => {

        const shipment = await shipmentService.updateShipment(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shipment updated successfully.",

                shipment

            )

        );

    });

    /*
    =====================================
    Delete Shipment
    =====================================
    */

    deleteShipment = asyncHandler(async (req, res) => {

        await shipmentService.deleteShipment(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shipment deleted successfully."

            )

        );

    });

}

export default new ShipmentController();