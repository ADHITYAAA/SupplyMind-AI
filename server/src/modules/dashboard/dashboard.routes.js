import express from "express";

import dashboardController from "./dashboard.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = express.Router();

/*
=====================================
Overview Dashboard
=====================================
*/

router.get(
    "/overview",
    authMiddleware,
    dashboardController.getOverviewDashboard
);

/*
=====================================
Inventory Dashboard
=====================================
*/

router.get(
    "/inventory",
    authMiddleware,
    dashboardController.getInventoryDashboard
);

/*
=====================================
Procurement Dashboard
=====================================
*/

router.get(
    "/procurement",
    authMiddleware,
    dashboardController.getProcurementDashboard
);

/*
=====================================
Warehouse Dashboard
=====================================
*/

router.get(
    "/warehouse",
    authMiddleware,
    dashboardController.getWarehouseDashboard
);

/*
=====================================
Supplier Dashboard
=====================================
*/

router.get(
    "/suppliers",
    authMiddleware,
    dashboardController.getSupplierDashboard
);

/*
=====================================
Finance Dashboard
=====================================
*/

router.get(
    "/finance",
    authMiddleware,
    dashboardController.getFinanceDashboard
);

export default router;