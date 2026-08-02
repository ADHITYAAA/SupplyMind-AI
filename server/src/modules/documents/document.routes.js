import express from "express";

import documentController from "./document.controller.js";
import upload from "./multer.config.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Upload Document
=====================================
*/

router.post(

    "/upload",

    authMiddleware,

    roleMiddleware(

        "Admin",

        "Supply Chain Manager",

        "Procurement Officer",

        "Warehouse Manager"

    ),

    upload.single("document"),

    documentController.uploadDocument

);

/*
=====================================
Get All Documents
=====================================
*/

router.get(

    "/",

    authMiddleware,

    documentController.getAllDocuments

);

/*
=====================================
Get Document By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    documentController.getDocumentById

);

/*
=====================================
Update Document
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin"

    ),

    documentController.updateDocument

);

/*
=====================================
Delete Document
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin"

    ),

    documentController.deleteDocument

);

export default router;