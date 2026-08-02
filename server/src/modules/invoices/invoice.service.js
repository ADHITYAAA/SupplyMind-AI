import invoiceRepository from "./invoice.repository.js";
import purchaseOrderRepository from "../purchase-orders/purchase-order.repository.js";
import supplierRepository from "../suppliers/supplier.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class InvoiceService {

    /*
    =====================================
    Create Invoice
    =====================================
    */

    async createInvoice(invoiceData, userId) {

        /*
        =====================================
        Validate Purchase Order
        =====================================
        */

        const purchaseOrder =
            await purchaseOrderRepository.findById(
                invoiceData.purchaseOrder
            );

        if (!purchaseOrder) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Purchase Order not found."
            );

        }

        /*
        =====================================
        Validate Supplier
        =====================================
        */

        const supplier =
            await supplierRepository.findById(
                invoiceData.supplier
            );

        if (!supplier) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Supplier not found."
            );

        }

        /*
        =====================================
        Prevent Duplicate Invoice Number
        =====================================
        */

        const existingInvoice =
            await invoiceRepository.findByInvoiceNumber(
                invoiceData.invoiceNumber
            );

        if (existingInvoice) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invoice number already exists."
            );

        }

        /*
        =====================================
        Validate Due Date
        =====================================
        */

        if (

            new Date(invoiceData.dueDate) <

            new Date(invoiceData.invoiceDate)

        ) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Due date cannot be earlier than invoice date."
            );

        }

        /*
        =====================================
        Auto Calculate Total Amount
        =====================================
        */

        invoiceData.totalAmount =

            invoiceData.subtotal +

            invoiceData.taxAmount -

            invoiceData.discountAmount;

        /*
        =====================================
        Audit
        =====================================
        */

        invoiceData.createdBy = userId;

        return await invoiceRepository.create(
            invoiceData
        );

    }

    /*
    =====================================
    Get Invoice By ID
    =====================================
    */

    async findInvoiceById(invoiceId) {

        const invoice =
            await invoiceRepository.findById(
                invoiceId
            );

        if (!invoice) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Invoice not found."
            );

        }

        return invoice;

    }

    /*
    =====================================
    Get All Invoices
    =====================================
    */

    async findAllInvoices(query) {

        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;

        const filters = {

            supplier: query.supplier,

            paymentStatus: query.paymentStatus

        };

        return await invoiceRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Invoice
    =====================================
    */

    async updateInvoice(

        invoiceId,

        invoiceData

    ) {

        const existingInvoice =
            await invoiceRepository.findById(
                invoiceId
            );

        if (!existingInvoice) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Invoice not found."
            );

        }

        /*
        =====================================
        Validate Due Date
        =====================================
        */

        const invoiceDate =

            invoiceData.invoiceDate ??

            existingInvoice.invoiceDate;

        const dueDate =

            invoiceData.dueDate ??

            existingInvoice.dueDate;

        if (

            new Date(dueDate) <

            new Date(invoiceDate)

        ) {

            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Due date cannot be earlier than invoice date."
            );

        }

        /*
        =====================================
        Recalculate Total Amount
        =====================================
        */

        const subtotal =

            invoiceData.subtotal ??

            existingInvoice.subtotal;

        const taxAmount =

            invoiceData.taxAmount ??

            existingInvoice.taxAmount;

        const discountAmount =

            invoiceData.discountAmount ??

            existingInvoice.discountAmount;

        invoiceData.totalAmount =

            subtotal +

            taxAmount -

            discountAmount;

        const invoice =
            await invoiceRepository.update(

                invoiceId,

                invoiceData

            );

        if (!invoice) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Invoice not found."
            );

        }

        return invoice;

    }

    /*
    =====================================
    Delete Invoice
    =====================================
    */

    async deleteInvoice(invoiceId) {

        const invoice =
            await invoiceRepository.delete(
                invoiceId
            );

        if (!invoice) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Invoice not found."
            );

        }

        return invoice;

    }

}

export default new InvoiceService();