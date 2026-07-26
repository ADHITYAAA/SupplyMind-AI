import express from "express";

import {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} from "./user.controller.js";

const router = express.Router();

/*
=========================================
User Routes
=========================================
*/

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;