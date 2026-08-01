import binService from "./bin.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class BinController {

    /*
    =====================================
    Create Bin
    =====================================
    */

    createBin = asyncHandler(async (req, res) => {

        const bin = await binService.createBin(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Bin created successfully.",

                bin

            )

        );

    });

    /*
    =====================================
    Get Bin By ID
    =====================================
    */

    getBinById = asyncHandler(async (req, res) => {

        const bin = await binService.findBinById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Bin fetched successfully.",

                bin

            )

        );

    });

    /*
    =====================================
    Get All Bins
    =====================================
    */

    getAllBins = asyncHandler(async (req, res) => {

        const bins = await binService.findAllBins(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Bins fetched successfully.",

                bins

            )

        );

    });

    /*
    =====================================
    Update Bin
    =====================================
    */

    updateBin = asyncHandler(async (req, res) => {

        const bin = await binService.updateBin(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Bin updated successfully.",

                bin

            )

        );

    });

    /*
    =====================================
    Delete Bin
    =====================================
    */

    deleteBin = asyncHandler(async (req, res) => {

        await binService.deleteBin(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Bin deleted successfully."

            )

        );

    });

}

export default new BinController();