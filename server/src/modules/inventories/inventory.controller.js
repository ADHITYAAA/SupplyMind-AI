import inventoryService from "./inventory.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class InventoryController {

    /*
    =====================================
    Create Inventory
    =====================================
    */

    createInventory = asyncHandler(async (req, res) => {

        const inventory = await inventoryService.createInventory(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Inventory created successfully.",

                inventory

            )

        );

    });

    /*
    =====================================
    Get Inventory By ID
    =====================================
    */

    getInventoryById = asyncHandler(async (req, res) => {

        const inventory = await inventoryService.findInventoryById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Inventory fetched successfully.",

                inventory

            )

        );

    });

    /*
    =====================================
    Get All Inventories
    =====================================
    */

    getAllInventories = asyncHandler(async (req, res) => {

        const inventories = await inventoryService.findAllInventories(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Inventories fetched successfully.",

                inventories

            )

        );

    });

    /*
    =====================================
    Update Inventory
    =====================================
    */

    updateInventory = asyncHandler(async (req, res) => {

        const inventory = await inventoryService.updateInventory(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Inventory updated successfully.",

                inventory

            )

        );

    });

    /*
    =====================================
    Delete Inventory
    =====================================
    */

    deleteInventory = asyncHandler(async (req, res) => {

        await inventoryService.deleteInventory(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Inventory deleted successfully."

            )

        );

    });

}

export default new InventoryController();