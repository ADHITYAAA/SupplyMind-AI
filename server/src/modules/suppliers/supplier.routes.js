import express from "express";

import {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} from "./supplier.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=========================================
Protected Supplier Routes
=========================================
*/

// Create Supplier (Admin, Manager)
router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin", "Manager"),
    createSupplier
);

// Get All Suppliers (Authenticated Users)
router.get(
    "/",
    authMiddleware,
    getAllSuppliers
);

// Get Supplier By ID (Authenticated Users)
router.get(
    "/:id",
    authMiddleware,
    getSupplierById
);

// Update Supplier (Admin, Manager)
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin", "Manager"),
    updateSupplier
);

// Delete Supplier (Admin Only)
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    deleteSupplier
);

export default router;