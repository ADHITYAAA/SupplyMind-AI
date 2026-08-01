import express from "express";

import shipmentController from "./shipment.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Shipment
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware("Admin", "Supply Chain Manager"),

    shipmentController.createShipment

);

/*
=====================================
Get All Shipments
=====================================
*/

router.get(

    "/",

    authMiddleware,

    shipmentController.getAllShipments

);

/*
=====================================
Get Shipment By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    shipmentController.getShipmentById

);

/*
=====================================
Update Shipment
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin", "Supply Chain Manager"),

    shipmentController.updateShipment

);

/*
=====================================
Delete Shipment
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin"),

    shipmentController.deleteShipment

);

export default router;