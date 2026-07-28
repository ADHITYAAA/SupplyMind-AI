import warehouseService from "./warehouse.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class WarehouseController {

    /*
    =====================================
    Create Warehouse
    =====================================
    */

    createWarehouse = asyncHandler(async (req, res) => {

        const warehouse = await warehouseService.createWarehouse(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Warehouse created successfully.",

                warehouse

            )

        );

    });

    /*
    =====================================
    Get Warehouse By ID
    =====================================
    */

    getWarehouseById = asyncHandler(async (req, res) => {

        const warehouse = await warehouseService.findWarehouseById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Warehouse fetched successfully.",

                warehouse

            )

        );

    });

    /*
    =====================================
    Get All Warehouses
    =====================================
    */

    getAllWarehouses = asyncHandler(async (req, res) => {

        const warehouses = await warehouseService.findAllWarehouses(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Warehouses fetched successfully.",

                warehouses

            )

        );

    });

    /*
    =====================================
    Update Warehouse
    =====================================
    */

    updateWarehouse = asyncHandler(async (req, res) => {

        const warehouse = await warehouseService.updateWarehouse(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Warehouse updated successfully.",

                warehouse

            )

        );

    });

    /*
    =====================================
    Delete Warehouse
    =====================================
    */

    deleteWarehouse = asyncHandler(async (req, res) => {

        await warehouseService.deleteWarehouse(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Warehouse deleted successfully."

            )

        );

    });

}

export default new WarehouseController();