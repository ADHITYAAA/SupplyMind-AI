import Product from "./product.model.js";
import buildPagination from "../../common/utils/pagination.js";

class ProductRepository {

    /*
    =====================================
    Create Product
    =====================================
    */

    async create(productData) {

        return await Product.create(productData);

    }

    /*
    =====================================
    Find Product By ID
    =====================================
    */

    async findById(productId) {

        return await Product.findById(productId)
            .populate("supplier", "supplierName supplierCode")
            .populate("createdBy", "fullName email");

    }

    /*
    =====================================
    Find Product By Code
    =====================================
    */

    async findByProductCode(productCode) {

        return await Product.findOne({ productCode });

    }

    /*
    =====================================
    Find Product Code Excluding Current
    =====================================
    */

    async findByProductCodeExcludingId(
        productCode,
        productId
    ) {

        return await Product.findOne({

            productCode,

            _id: {
                $ne: productId
            }

        });

    }

    /*
    =====================================
    Get All Products
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        /*
        =====================================
        Search
        =====================================
        */

        if (filters.search) {

            query.$or = [

                {

                    productName: {

                        $regex: filters.search,

                        $options: "i"

                    }

                },

                {

                    productCode: {

                        $regex: filters.search,

                        $options: "i"

                    }

                }

            ];

        }

        /*
        =====================================
        Supplier Filter
        =====================================
        */

        if (filters.supplier) {

            query.supplier = filters.supplier;

        }

        /*
        =====================================
        Status Filter
        =====================================
        */

        if (filters.status) {

            query.status = filters.status;

        }

        const products = await Product.find(query)

            .populate("supplier", "supplierName supplierCode")

            .populate("createdBy", "fullName")

            .sort({

                createdAt: -1

            })

            .skip(skip)

            .limit(limit);

        const total = await Product.countDocuments(query);

        return {

            products,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Product
    =====================================
    */

    async update(productId, productData) {

        return await Product.findByIdAndUpdate(

            productId,

            productData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate("supplier", "supplierName supplierCode")

            .populate("createdBy", "fullName");

    }

    /*
    =====================================
    Delete Product
    =====================================
    */

    async delete(productId) {

        return await Product.findByIdAndDelete(productId);

    }

}

export default new ProductRepository();