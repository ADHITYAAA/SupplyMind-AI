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

            warehouse: null,

            rack: null,

            shelf: null,

            shipmentId: null,

            invoiceDate: null,

            dueDate: null,

            totalAmount: null,

            products: []

        };

        /*
        =====================================
        Invoice Number
        =====================================
        */

        entities.invoiceNumber = RegexUtils.find(

            /Invoice\s+Number\s*:?\s*([A-Z0-9\-\/]+)/i,

            text

        );

        /*
        =====================================
        Supplier Name
        =====================================
        */

        entities.supplierName = RegexUtils.find(

            /Supplier\s*:?\s*(.*?)\s+(?:Warehouse|Rack|Shelf|Invoice\s*Date|Purchase\s*Order|Shipment|Total)/i,

            text

        );

        /*
        =====================================
        Purchase Order
        =====================================
        */

        entities.purchaseOrder = RegexUtils.find(

            /(?:PO\s*Number|Purchase\s*Order(?:\s*Number)?)\s*:?\s*([A-Z0-9\-\/]+)/i,

            text

        );

        /*
        =====================================
        Warehouse
        =====================================
        */

        entities.warehouse = RegexUtils.find(

            /Warehouse\s*:?\s*(.*?)\s+Rack/i,

            text

        );

        /*
        =====================================
        Rack
        =====================================
        */

        entities.rack = RegexUtils.find(

            /Rack\s*:?\s*(.*?)\s+Shelf/i,

            text

        );

        /*
        =====================================
        Shelf
        =====================================
        */

        entities.shelf = RegexUtils.find(

            /Shelf\s*:?\s*(.*?)\s+Shipment/i,

            text

        );

        /*
        =====================================
        Shipment ID
        =====================================
        */

        entities.shipmentId = RegexUtils.find(

            /Shipment\s*ID\s*:?\s*([A-Z0-9\-\/]+)/i,

            text

        );

        /*
        =====================================
        Invoice Date
        =====================================
        */

        entities.invoiceDate = RegexUtils.find(

            /Invoice\s*Date\s*:?\s*([0-9]{2}-[A-Za-z]{3}-[0-9]{4})/i,

            text

        );

        /*
        =====================================
        Due Date
        =====================================
        */

        entities.dueDate = RegexUtils.find(

            /Due\s*Date\s*:?\s*([0-9]{2}-[A-Za-z]{3}-[0-9]{4})/i,

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

        /*
        =====================================
        Extract Products
        =====================================
        */

        const productRegex =

            /(PRD-\d+)\s+(.+?)\s+(\d+)\s+(\d+)/g;

        let match;

        while (

            (match = productRegex.exec(text)) !== null

        ) {

            entities.products.push({

                productId: match[1],

                productName: match[2].trim(),

                quantity: Number(match[3]),

                unitPrice: Number(match[4])

            });

        }

        /*
        =====================================
        Debug
        =====================================
        */

        console.log("\n========== INVOICE ENTITIES ==========");
        console.log(entities);
        console.log("======================================\n");

        return entities;

    }

}

export default new InvoiceExtractor();