import shelfService from "./shelf.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ShelfController {

    /*
    =====================================
    Create Shelf
    =====================================
    */

    createShelf = asyncHandler(async (req, res) => {

        const shelf = await shelfService.createShelf(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Shelf created successfully.",

                shelf

            )

        );

    });

    /*
    =====================================
    Get Shelf By ID
    =====================================
    */

    getShelfById = asyncHandler(async (req, res) => {

        const shelf = await shelfService.findShelfById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shelf fetched successfully.",

                shelf

            )

        );

    });

    /*
    =====================================
    Get All Shelves
    =====================================
    */

    getAllShelves = asyncHandler(async (req, res) => {

        const shelves = await shelfService.findAllShelves(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shelves fetched successfully.",

                shelves

            )

        );

    });

    /*
    =====================================
    Update Shelf
    =====================================
    */

    updateShelf = asyncHandler(async (req, res) => {

        const shelf = await shelfService.updateShelf(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shelf updated successfully.",

                shelf

            )

        );

    });

    /*
    =====================================
    Delete Shelf
    =====================================
    */

    deleteShelf = asyncHandler(async (req, res) => {

        await shelfService.deleteShelf(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Shelf deleted successfully."

            )

        );

    });

}

export default new ShelfController();