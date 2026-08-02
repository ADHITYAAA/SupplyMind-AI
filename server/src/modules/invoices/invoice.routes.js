import express from "express";

import invoiceController from "./invoice.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Invoice
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware(

        "Admin",

        "Procurement Officer"

    ),

    invoiceController.createInvoice

);

/*
=====================================
Get All Invoices
=====================================
*/

router.get(

    "/",

    authMiddleware,

    invoiceController.getAllInvoices

);

/*
=====================================
Get Invoice By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    invoiceController.getInvoiceById

);

/*
=====================================
Update Invoice
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin",

        "Procurement Officer"

    ),

    invoiceController.updateInvoice

);

/*
=====================================
Delete Invoice
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware(

        "Admin"

    ),

    invoiceController.deleteInvoice

);

export default router;