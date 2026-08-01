import express from "express";
import ApiResponse from "../common/responses/ApiResponse.js";

import userRoutes from "../modules/users/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import supplierRoutes from "../modules/suppliers/supplier.routes.js";
import productRoutes from "../modules/products/product.routes.js";
import warehouseRoutes from "../modules/warehouses/warehouse.routes.js";
import inventoryRoutes from "../modules/inventories/inventory.routes.js";
import shipmentRoutes from "../modules/shipments/shipment.routes.js";
import purchaseOrderRoutes from "../modules/purchase-orders/purchase-order.routes.js";
import zoneRoutes from "../modules/warehouse-zones/zone.routes.js";
import rackRoutes from "../modules/warehouse-racks/rack.routes.js";

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

router.use("/products", productRoutes);

router.use("/warehouses", warehouseRoutes);

router.use("/inventories", inventoryRoutes);

router.use("/shipments", shipmentRoutes);

router.use("/purchase-orders", purchaseOrderRoutes);

router.use("/warehouse-zones", zoneRoutes);

router.use("/warehouse-racks", rackRoutes);

export default router;