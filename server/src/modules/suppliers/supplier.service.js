import supplierRepository from "./supplier.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class SupplierService {

    /*
    =====================================
    Create Supplier
    =====================================
    */

    async createSupplier(supplierData, userId) {

        // Check duplicate supplier code
        const supplierCodeExists =
            await supplierRepository.findBySupplierCode(
                supplierData.supplierCode
            );

        if (supplierCodeExists) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Supplier code already exists."
            );

        }

        // Check duplicate email
        const emailExists =
            await supplierRepository.findByEmail(
                supplierData.email
            );

        if (emailExists) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Supplier email already exists."
            );

        }

        // Add creator information
        supplierData.createdBy = userId;

        return await supplierRepository.create(supplierData);

    }

    /*
    =====================================
    Get Supplier By ID
    =====================================
    */

    async findSupplierById(supplierId) {

        const supplier =
            await supplierRepository.findById(supplierId);

        if (!supplier) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Supplier not found."
            );

        }

        return supplier;

    }

    /*
    =====================================
    Get All Suppliers
    =====================================
    */

    async findAllSuppliers(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            search: query.search,

            status: query.status,

            category: query.category

        };

        return await supplierRepository.findAll(
            filters,
            page,
            limit
        );

    }

    /*
    =====================================
    Update Supplier
    =====================================
    */

    async updateSupplier(supplierId, supplierData) {

        /*
        =====================================
        Check Duplicate Supplier Code
        =====================================
        */

        if (supplierData.supplierCode) {

            const supplierCodeExists =
                await supplierRepository.findBySupplierCodeExcludingId(

                    supplierData.supplierCode,

                    supplierId

                );

            if (supplierCodeExists) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Supplier code already exists."

                );

            }

        }

        /*
        =====================================
        Check Duplicate Email
        =====================================
        */

        if (supplierData.email) {

            const emailExists =
                await supplierRepository.findByEmailExcludingId(

                    supplierData.email,

                    supplierId

                );

            if (emailExists) {

                throw new ApiError(

                    HTTP_STATUS.BAD_REQUEST,

                    "Supplier email already exists."

                );

            }

        }

        /*
        =====================================
        Update Supplier
        =====================================
        */

        const supplier =
            await supplierRepository.update(

                supplierId,

                supplierData

            );

        if (!supplier) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Supplier not found."

            );

        }

        return supplier;

    }

    /*
    =====================================
    Delete Supplier
    =====================================
    */

    async deleteSupplier(supplierId) {

        const supplier =
            await supplierRepository.delete(
                supplierId
            );

        if (!supplier) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Supplier not found."
            );

        }

        return supplier;

    }

}

export default new SupplierService();