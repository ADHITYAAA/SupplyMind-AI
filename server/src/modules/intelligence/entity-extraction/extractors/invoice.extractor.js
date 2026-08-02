import RegexUtils from "../regex.utils.js";

class InvoiceExtractor {

    /*
    =====================================
    Extract Invoice Information
    =====================================
    */

    async extract(text) {

        const entities = {

            documentType: "Invoice",

            invoiceNumber: null,

            supplierName: null,

            purchaseOrder: null,

            invoiceDate: null,

            dueDate: null,

            totalAmount: null

        };

        /*
        =====================================
        Invoice Number
        =====================================
        */

        entities.invoiceNumber = RegexUtils.find(

            /Invoice\s+Number\s*:\s*([A-Z0-9\-\/]+)/i,

            text

        );

        /*
        =====================================
        Supplier Name
        =====================================
        */

        entities.supplierName = RegexUtils.find(

            /Supplier\s*:\s*(.*?)\s+Invoice\s+Date/i,

            text

        );

        /*
        =====================================
        Purchase Order
        =====================================
        */

        entities.purchaseOrder = RegexUtils.find(

            /PO\s*Number\s*:\s*([A-Z0-9\-\/]+)/i,

            text

        );

        /*
        =====================================
        Invoice Date
        =====================================
        */

        entities.invoiceDate = RegexUtils.find(

            /Invoice\s*Date\s*:\s*([0-9]{2}-[A-Za-z]{3}-[0-9]{4})/i,

            text

        );

        /*
        =====================================
        Due Date
        =====================================
        */

        entities.dueDate = RegexUtils.find(

            /Due\s*Date\s*:\s*([0-9]{2}-[A-Za-z]{3}-[0-9]{4})/i,

            text

        );

        /*
        =====================================
        Total Amount
        =====================================
        */

        const totals = [

            ...text.matchAll(

                /Total[^0-9]*([\d,]+\.\d{2}|[\d,]+)/gi

            )

        ];

        if (totals.length > 0) {

            entities.totalAmount =

                totals[totals.length - 1][1];

        }

        return entities;

    }

}

export default new InvoiceExtractor();