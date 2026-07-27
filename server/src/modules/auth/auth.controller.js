import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";
import authService from "./auth.service.js";

/*
=========================================
Login User
=========================================
*/

export const loginUser = asyncHandler(async (req, res) => {

    const result = await authService.loginUser(req.body);

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "Login successful.",
            result
        )

    );

});

/*
=========================================
Get Current User
=========================================
*/

export const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await authService.getCurrentUser(req.user._id);

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "Current user fetched successfully.",
            user
        )

    );

});