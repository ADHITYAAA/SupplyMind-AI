import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";
import supplierService from "./supplier.service.js";

/*
=========================================
Create Supplier
=========================================
*/

export const createSupplier = asyncHandler(async (req, res) => {

    const supplier = await supplierService.createSupplier(
        req.body,
        req.user._id
    );

    return res.status(HTTP_STATUS.CREATED).json(

        new ApiResponse(
            HTTP_STATUS.CREATED,
            "Supplier created successfully.",
            supplier
        )

    );

});

/*
=========================================
Get Supplier By ID
=========================================
*/

export const getSupplierById = asyncHandler(async (req, res) => {

    const supplier = await supplierService.findSupplierById(
        req.params.id
    );

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "Supplier fetched successfully.",
            supplier
        )

    );

});

/*
=========================================
Get All Suppliers
=========================================
*/

export const getAllSuppliers = asyncHandler(async (req, res) => {

    const suppliers = await supplierService.findAllSuppliers(
        req.query
    );

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "Suppliers fetched successfully.",
            suppliers
        )

    );

});

/*
=========================================
Update Supplier
=========================================
*/

export const updateSupplier = asyncHandler(async (req, res) => {

    const supplier = await supplierService.updateSupplier(
        req.params.id,
        req.body
    );

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "Supplier updated successfully.",
            supplier
        )

    );

});

/*
=========================================
Delete Supplier
=========================================
*/

export const deleteSupplier = asyncHandler(async (req, res) => {

    const supplier = await supplierService.deleteSupplier(
        req.params.id
    );

    return res.status(HTTP_STATUS.SUCCESS).json(

        new ApiResponse(
            HTTP_STATUS.SUCCESS,
            "Supplier deleted successfully.",
            supplier
        )

    );

});