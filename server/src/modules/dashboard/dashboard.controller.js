import dashboardService from "./dashboard.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class DashboardController {

    /*
    =====================================
    Overview Dashboard
    =====================================
    */

    getOverviewDashboard = asyncHandler(async (req, res) => {

        const dashboard = await dashboardService.getOverviewDashboard();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Dashboard overview fetched successfully.",

                dashboard

            )

        );

    });

    /*
    =====================================
    Inventory Dashboard
    =====================================
    */

    getInventoryDashboard = asyncHandler(async (req, res) => {

        const dashboard = await dashboardService.getInventoryDashboard();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Inventory dashboard fetched successfully.",

                dashboard

            )

        );

    });

    /*
    =====================================
    Procurement Dashboard
    =====================================
    */

    getProcurementDashboard = asyncHandler(async (req, res) => {

        const dashboard = await dashboardService.getProcurementDashboard();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Procurement dashboard fetched successfully.",

                dashboard

            )

        );

    });

    /*
    =====================================
    Warehouse Dashboard
    =====================================
    */

    getWarehouseDashboard = asyncHandler(async (req, res) => {

        const dashboard = await dashboardService.getWarehouseDashboard();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Warehouse dashboard fetched successfully.",

                dashboard

            )

        );

    });

    /*
    =====================================
    Supplier Dashboard
    =====================================
    */

    getSupplierDashboard = asyncHandler(async (req, res) => {

        const dashboard = await dashboardService.getSupplierDashboard();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Supplier dashboard fetched successfully.",

                dashboard

            )

        );

    });

    /*
    =====================================
    Finance Dashboard
    =====================================
    */

    getFinanceDashboard = asyncHandler(async (req, res) => {

        const dashboard = await dashboardService.getFinanceDashboard();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Finance dashboard fetched successfully.",

                dashboard

            )

        );

    });

}

export default new DashboardController();