import express from "express";

import {
    loginUser,
    getCurrentUser
} from "./auth.controller.js";

import authMiddleware from "./auth.middleware.js";

const router = express.Router();

/*
=========================================
Authentication Routes
=========================================
*/

// Public Route
router.post("/login", loginUser);

// Protected Route
router.get(
    "/me",
    authMiddleware,
    getCurrentUser
);

export default router;