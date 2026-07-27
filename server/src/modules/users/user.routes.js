import express from "express";

import {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} from "./user.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=========================================
Public Routes
=========================================
*/

// Register New User
router.post("/", createUser);

/*
=========================================
Protected Routes
=========================================
*/

// Get All Users (Admin Only)
router.get(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    getAllUsers
);

// Get User By ID (Authenticated Users)
router.get(
    "/:id",
    authMiddleware,
    getUserById
);

// Update User (Authenticated Users)
router.put(
    "/:id",
    authMiddleware,
    updateUser
);

// Delete User (Admin Only)
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    deleteUser
);

export default router;