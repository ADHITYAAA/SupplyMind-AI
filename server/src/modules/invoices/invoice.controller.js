import invoiceService from "./invoice.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class InvoiceController {

    /*
    =====================================
    Create Invoice
    =====================================
    */

    createInvoice = asyncHandler(async (req, res) => {

        const invoice = await invoiceService.createInvoice(

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Invoice created successfully.",

                invoice

            )

        );

    });

    /*
    =====================================
    Get Invoice By ID
    =====================================
    */

    getInvoiceById = asyncHandler(async (req, res) => {

        const invoice = await invoiceService.findInvoiceById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Invoice fetched successfully.",

                invoice

            )

        );

    });

    /*
    =====================================
    Get All Invoices
    =====================================
    */

    getAllInvoices = asyncHandler(async (req, res) => {

        const invoices = await invoiceService.findAllInvoices(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Invoices fetched successfully.",

                invoices

            )

        );

    });

    /*
    =====================================
    Update Invoice
    =====================================
    */

    updateInvoice = asyncHandler(async (req, res) => {

        const invoice = await invoiceService.updateInvoice(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Invoice updated successfully.",

                invoice

            )

        );

    });

    /*
    =====================================
    Delete Invoice
    =====================================
    */

    deleteInvoice = asyncHandler(async (req, res) => {

        await invoiceService.deleteInvoice(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Invoice deleted successfully."

            )

        );

    });

}

export default new InvoiceController();