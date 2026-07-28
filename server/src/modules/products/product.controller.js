import productService from "./product.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ProductController {

    /*
    =====================================
    Create Product
    =====================================
    */

    createProduct = asyncHandler(async (req, res) => {

        const product = await productService.createProduct(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Product created successfully.",

                product

            )

        );

    });

    /*
    =====================================
    Get Product By ID
    =====================================
    */

    getProductById = asyncHandler(async (req, res) => {

        const product = await productService.findProductById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Product fetched successfully.",

                product

            )

        );

    });

    /*
    =====================================
    Get All Products
    =====================================
    */

    getAllProducts = asyncHandler(async (req, res) => {

        const products = await productService.findAllProducts(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Products fetched successfully.",

                products

            )

        );

    });

    /*
    =====================================
    Update Product
    =====================================
    */

    updateProduct = asyncHandler(async (req, res) => {

        const product = await productService.updateProduct(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Product updated successfully.",

                product

            )

        );

    });

    /*
    =====================================
    Delete Product
    =====================================
    */

    deleteProduct = asyncHandler(async (req, res) => {

        await productService.deleteProduct(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Product deleted successfully."

            )

        );

    });

}

export default new ProductController();