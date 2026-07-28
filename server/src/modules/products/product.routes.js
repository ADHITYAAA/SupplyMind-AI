import express from "express";

import productController from "./product.controller.js";

import authMiddleware from "../auth/auth.middleware.js";
import roleMiddleware from "../auth/role.middleware.js";

const router = express.Router();

/*
=====================================
Create Product
=====================================
*/

router.post(

    "/",

    authMiddleware,

    roleMiddleware("Admin", "Manager"),

    productController.createProduct

);

/*
=====================================
Get All Products
=====================================
*/

router.get(

    "/",

    authMiddleware,

    productController.getAllProducts

);

/*
=====================================
Get Product By ID
=====================================
*/

router.get(

    "/:id",

    authMiddleware,

    productController.getProductById

);

/*
=====================================
Update Product
=====================================
*/

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin", "Manager"),

    productController.updateProduct

);

/*
=====================================
Delete Product
=====================================
*/

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("Admin"),

    productController.deleteProduct

);

export default router;