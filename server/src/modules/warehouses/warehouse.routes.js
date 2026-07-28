import express from "express";

import warehouseController from "./warehouse.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Warehouse
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware("Admin", "Warehouse Manager"),

    warehouseController.createWarehouse

);

/*
=====================================
Get All Warehouses
=====================================
*/

router.get(

    "/",

    authMiddleware,

    warehouseController.getAllWarehouses

);

/*
=====================================
Get Warehouse By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    warehouseController.getWarehouseById

);

/*
=====================================
Update Warehouse
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin", "Warehouse Manager"),

    warehouseController.updateWarehouse

);

/*
=====================================
Delete Warehouse
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin"),

    warehouseController.deleteWarehouse

);

export default router;