import express from "express";

import rackController from "./rack.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Rack
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware(
        "Admin",
        "Warehouse Manager"
    ),

    rackController.createRack

);

/*
=====================================
Get All Racks
=====================================
*/

router.get(

    "/",

    authMiddleware,

    rackController.getAllRacks

);

/*
=====================================
Get Rack By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    rackController.getRackById

);

/*
=====================================
Update Rack
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "Admin",
        "Warehouse Manager"
    ),

    rackController.updateRack

);

/*
=====================================
Delete Rack
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin"),

    rackController.deleteRack

);

export default router;