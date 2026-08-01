import express from "express";

import shelfController from "./shelf.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Shelf
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware(

        "Admin",

        "Warehouse Manager"

    ),

    shelfController.createShelf

);

/*
=====================================
Get All Shelves
=====================================
*/

router.get(

    "/",

    authMiddleware,

    shelfController.getAllShelves

);

/*
=====================================
Get Shelf By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    shelfController.getShelfById

);

/*
=====================================
Update Shelf
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin",

        "Warehouse Manager"

    ),

    shelfController.updateShelf

);

/*
=====================================
Delete Shelf
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin"

    ),

    shelfController.deleteShelf

);

export default router;