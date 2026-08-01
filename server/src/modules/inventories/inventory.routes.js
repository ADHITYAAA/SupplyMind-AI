import express from "express";

import inventoryController from "./inventory.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Inventory
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware("Admin", "Warehouse Manager"),

    inventoryController.createInventory

);

/*
=====================================
Get All Inventories
=====================================
*/

router.get(

    "/",

    authMiddleware,

    inventoryController.getAllInventories

);

/*
=====================================
Get Inventory By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    inventoryController.getInventoryById

);

/*
=====================================
Update Inventory
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin", "Warehouse Manager"),

    inventoryController.updateInventory

);

/*
=====================================
Delete Inventory
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin"),

    inventoryController.deleteInventory

);

export default router;