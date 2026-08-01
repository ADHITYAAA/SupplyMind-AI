import express from "express";

import purchaseOrderController from "./purchase-order.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Purchase Order
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware(
        "Admin",
        "Procurement Officer",
        "Supply Chain Manager"
    ),

    purchaseOrderController.createPurchaseOrder

);

/*
=====================================
Get All Purchase Orders
=====================================
*/

router.get(

    "/",

    authMiddleware,

    purchaseOrderController.getAllPurchaseOrders

);

/*
=====================================
Get Purchase Order By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    purchaseOrderController.getPurchaseOrderById

);

/*
=====================================
Update Purchase Order
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "Admin",
        "Procurement Officer",
        "Supply Chain Manager"
    ),

    purchaseOrderController.updatePurchaseOrder

);

/*
=====================================
Delete Purchase Order
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin"),

    purchaseOrderController.deletePurchaseOrder

);

export default router;