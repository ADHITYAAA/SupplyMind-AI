import express from "express";

import zoneController from "./zone.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Zone
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware(
        "Admin",
        "Warehouse Manager"
    ),

    zoneController.createZone

);

/*
=====================================
Get All Zones
=====================================
*/

router.get(

    "/",

    authMiddleware,

    zoneController.getAllZones

);

/*
=====================================
Get Zone By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    zoneController.getZoneById

);

/*
=====================================
Update Zone
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "Admin",
        "Warehouse Manager"
    ),

    zoneController.updateZone

);

/*
=====================================
Delete Zone
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin"),

    zoneController.deleteZone

);

export default router;