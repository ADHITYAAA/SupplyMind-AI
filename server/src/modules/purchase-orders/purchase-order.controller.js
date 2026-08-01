import purchaseOrderService from "./purchase-order.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class PurchaseOrderController {

    /*
    =====================================
    Create Purchase Order
    =====================================
    */

    createPurchaseOrder = asyncHandler(async (req, res) => {

        const purchaseOrder =
            await purchaseOrderService.createPurchaseOrder(

                req.body,

                req.user.id

            );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Purchase Order created successfully.",

                purchaseOrder

            )

        );

    });

    /*
    =====================================
    Get Purchase Order By ID
    =====================================
    */

    getPurchaseOrderById = asyncHandler(async (req, res) => {

        const purchaseOrder =
            await purchaseOrderService.findPurchaseOrderById(

                req.params.id

            );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Purchase Order fetched successfully.",

                purchaseOrder

            )

        );

    });

    /*
    =====================================
    Get All Purchase Orders
    =====================================
    */

    getAllPurchaseOrders = asyncHandler(async (req, res) => {

        const purchaseOrders =
            await purchaseOrderService.findAllPurchaseOrders(

                req.query

            );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Purchase Orders fetched successfully.",

                purchaseOrders

            )

        );

    });

    /*
    =====================================
    Update Purchase Order
    =====================================
    */

    updatePurchaseOrder = asyncHandler(async (req, res) => {

        const purchaseOrder =
            await purchaseOrderService.updatePurchaseOrder(

                req.params.id,

                req.body

            );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Purchase Order updated successfully.",

                purchaseOrder

            )

        );

    });

    /*
    =====================================
    Delete Purchase Order
    =====================================
    */

    deletePurchaseOrder = asyncHandler(async (req, res) => {

        await purchaseOrderService.deletePurchaseOrder(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Purchase Order deleted successfully."

            )

        );

    });

}

export default new PurchaseOrderController();