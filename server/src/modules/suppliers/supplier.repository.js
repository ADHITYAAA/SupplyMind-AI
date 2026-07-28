import Supplier from "./supplier.model.js";
import buildPagination from "../../common/utils/pagination.js";

class SupplierRepository {

    /*
    =====================================
    Create Supplier
    =====================================
    */

    async create(supplierData) {

        return await Supplier.create(supplierData);

    }

    /*
    =====================================
    Find Supplier By ID
    =====================================
    */

    async findById(supplierId) {

        return await Supplier.findById(supplierId)
            .populate("createdBy", "fullName email role");

    }

    /*
    =====================================
    Find Supplier By Email
    =====================================
    */

    async findByEmail(email) {

        return await Supplier.findOne({ email });

    }

    /*
    =====================================
    Find Supplier By Code
    =====================================
    */

    async findBySupplierCode(supplierCode) {

        return await Supplier.findOne({ supplierCode });

    }

    /*
    =====================================
    Find Supplier By Email Excluding Current
    =====================================
    */

    async findByEmailExcludingId(email, supplierId) {

        return await Supplier.findOne({

            email,

            _id: {
                $ne: supplierId
            }

        });

    }

    /*
    =====================================
    Find Supplier Code Excluding Current
    =====================================
    */

    async findBySupplierCodeExcludingId(
        supplierCode,
        supplierId
    ) {

        return await Supplier.findOne({

            supplierCode,

            _id: {
                $ne: supplierId
            }

        });

    }

    /*
    =====================================
    Get All Suppliers
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
                    supplierName: {
                        $regex: filters.search,
                        $options: "i"
                    }
                },

                {
                    companyName: {
                        $regex: filters.search,
                        $options: "i"
                    }
                },

                {
                    supplierCode: {
                        $regex: filters.search,
                        $options: "i"
                    }
                }

            ];

        }

        /*
        =====================================
        Status Filter
        =====================================
        */

        if (filters.status) {

            query.status = filters.status;

        }

        /*
        =====================================
        Category Filter
        =====================================
        */

        if (filters.category) {

            query.category = filters.category;

        }

        const suppliers = await Supplier.find(query)
            .populate("createdBy", "fullName email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Supplier.countDocuments(query);

        return {

            suppliers,

            pagination: buildPagination(
                total,
                page,
                limit
            )

        };

    }

    /*
    =====================================
    Update Supplier
    =====================================
    */

    async update(supplierId, supplierData) {

        return await Supplier.findByIdAndUpdate(

            supplierId,

            supplierData,

            {
                new: true,
                runValidators: true
            }

        );

    }

    /*
    =====================================
    Delete Supplier
    =====================================
    */

    async delete(supplierId) {

        return await Supplier.findByIdAndDelete(supplierId);

    }

}

export default new SupplierRepository();