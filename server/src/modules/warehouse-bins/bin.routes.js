import express from "express";

import binController from "./bin.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Bin
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware(

        "Admin",

        "Warehouse Manager"

    ),

    binController.createBin

);

/*
=====================================
Get All Bins
=====================================
*/

router.get(

    "/",

    authMiddleware,

    binController.getAllBins

);

/*
=====================================
Get Bin By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    binController.getBinById

);

/*
=====================================
Update Bin
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin",

        "Warehouse Manager"

    ),

    binController.updateBin

);

/*
=====================================
Delete Bin
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin"

    ),

    binController.deleteBin

);

export default router;