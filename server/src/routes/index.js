import express from "express";
import ApiResponse from "../common/responses/ApiResponse.js";

import userRoutes from "../modules/users/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import supplierRoutes from "../modules/suppliers/supplier.routes.js";

const router = express.Router();

/*
=========================================
Health Check
=========================================
*/

router.get("/", (req, res) => {

    return res.status(200).json(

        new ApiResponse(
            200,
            "SupplyMind AI Backend is running successfully 🚀",
            {
                version: "1.0.0",
                status: "Healthy"
            }
        )

    );

});

/*
=========================================
Application Routes
=========================================
*/

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/suppliers", supplierRoutes);

export default router;