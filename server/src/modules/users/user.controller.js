import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";
import userService from "./user.service.js";

/*
=========================================
Create User
=========================================
*/

export const createUser = asyncHandler(async (req, res) => {

    const user = await userService.registerUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json(

        new ApiResponse(
            HTTP_STATUS.CREATED,
            "User registered successfully.",
            user
        )

    );

});

/*
=========================================
Get User By ID
=========================================
*/

export const getUserById = asyncHandler(async (req, res) => {

    const user = await userService.findUserById(req.params.id);

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "User fetched successfully.",
            user
        )

    );

});

/*
=========================================
Get All Users
=========================================
*/

export const getAllUsers = asyncHandler(async (req, res) => {

    const users = await userService.findAllUsers();

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "Users fetched successfully.",
            users
        )

    );

});

/*
=========================================
Update User
=========================================
*/

export const updateUser = asyncHandler(async (req, res) => {

    const updatedUser = await userService.updateUser(
        req.params.id,
        req.body
    );

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "User updated successfully.",
            updatedUser
        )

    );

});

/*
=========================================
Delete User
=========================================
*/

export const deleteUser = asyncHandler(async (req, res) => {

    await userService.deleteUser(req.params.id);

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "User deleted successfully.",
            null
        )

    );

});