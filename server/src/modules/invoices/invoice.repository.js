import Invoice from "./invoice.model.js";
import buildPagination from "../../common/utils/pagination.js";

class InvoiceRepository {

    /*
    =====================================
    Create Invoice
    =====================================
    */

    async create(invoiceData) {

        return await Invoice.create(invoiceData);

    }

    /*
    =====================================
    Find Invoice By ID
    =====================================
    */

    async findById(invoiceId) {

        return await Invoice.findById(invoiceId)

            .populate(
                "purchaseOrder",
                "purchaseOrderNumber status totalAmount"
            )

            .populate(
                "supplier",
                "supplierName supplierCode"
            )

            .populate(
                "createdBy",
                "fullName email"
            );

    }

    /*
    =====================================
    Find By Invoice Number
    =====================================
    */

    async findByInvoiceNumber(invoiceNumber) {

        return await Invoice.findOne({

            invoiceNumber

        });

    }

    /*
    =====================================
    Get All Invoices
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

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
        Payment Status Filter
        =====================================
        */

        if (filters.paymentStatus) {

            query.paymentStatus = filters.paymentStatus;

        }

        const invoices = await Invoice.find(query)

            .populate(
                "purchaseOrder",
                "purchaseOrderNumber status totalAmount"
            )

            .populate(
                "supplier",
                "supplierName supplierCode"
            )

            .populate(
                "createdBy",
                "fullName"
            )

            .sort({

                invoiceDate: -1

            })

            .skip(skip)

            .limit(limit);

        const total = await Invoice.countDocuments(query);

        return {

            invoices,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Invoice
    =====================================
    */

    async update(

        invoiceId,

        invoiceData

    ) {

        return await Invoice.findByIdAndUpdate(

            invoiceId,

            invoiceData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(
                "purchaseOrder",
                "purchaseOrderNumber status totalAmount"
            )

            .populate(
                "supplier",
                "supplierName supplierCode"
            )

            .populate(
                "createdBy",
                "fullName"
            );

    }

    /*
    =====================================
    Delete Invoice
    =====================================
    */

    async delete(invoiceId) {

        return await Invoice.findByIdAndDelete(

            invoiceId

        );

    }

}

export default new InvoiceRepository();