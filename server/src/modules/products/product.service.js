import productRepository from "./product.repository.js";
import supplierRepository from "../suppliers/supplier.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class ProductService {

    /*
    =====================================
    Create Product
    =====================================
    */

    async createProduct(productData, userId) {

        /*
        =====================================
        Check Duplicate Product Code
        =====================================
        */

        const productExists =
            await productRepository.findByProductCode(
                productData.productCode
            );

        if (productExists) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Product code already exists."
            );

        }

        /*
        =====================================
        Check Supplier Exists
        =====================================
        */

        const supplier =
            await supplierRepository.findById(
                productData.supplier
            );

        if (!supplier) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Supplier not found."
            );

        }

        /*
        =====================================
        Add Creator
        =====================================
        */

        productData.createdBy = userId;

        return await productRepository.create(productData);

    }

    /*
    =====================================
    Get Product By ID
    =====================================
    */

    async findProductById(productId) {

        const product =
            await productRepository.findById(productId);

        if (!product) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Product not found."
            );

        }

        return product;

    }

    /*
    =====================================
    Get All Products
    =====================================
    */

    async findAllProducts(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            search: query.search,

            supplier: query.supplier,

            status: query.status

        };

        return await productRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Product
    =====================================
    */

    async updateProduct(productId, productData) {

        /*
        =====================================
        Check Duplicate Product Code
        =====================================
        */

        if (productData.productCode) {

            const duplicate =
                await productRepository.findByProductCodeExcludingId(

                    productData.productCode,

                    productId

                );

            if (duplicate) {

                throw new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Product code already exists."
                );

            }

        }

        /*
        =====================================
        Check Supplier Exists
        =====================================
        */

        if (productData.supplier) {

            const supplier =
                await supplierRepository.findById(
                    productData.supplier
                );

            if (!supplier) {

                throw new ApiError(
                    HTTP_STATUS.NOT_FOUND,
                    "Supplier not found."
                );

            }

        }

        const product =
            await productRepository.update(

                productId,

                productData

            );

        if (!product) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Product not found."
            );

        }

        return product;

    }

    /*
    =====================================
    Delete Product
    =====================================
    */

    async deleteProduct(productId) {

        const product =
            await productRepository.delete(
                productId
            );

        if (!product) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Product not found."
            );

        }

        return product;

    }

}

export default new ProductService();