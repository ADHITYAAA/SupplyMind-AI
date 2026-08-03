import graphService from "../graph.service.js";

import {

    CREATE_PURCHASE_ORDER,
    LINK_INVOICE_TO_PURCHASE_ORDER

} from "../queries/purchase-order.query.js";

class PurchaseOrderBuilder {

    async build(entities) {

        if (!entities.purchaseOrder) {

            console.log("Purchase Order Not Found");

            return;

        }

        console.log("\n====== PURCHASE ORDER BUILDER ======");
        console.log("PO Number :", entities.purchaseOrder);

        await graphService.execute(

            CREATE_PURCHASE_ORDER,

            {

                poNumber: entities.purchaseOrder

            }

        );

        await graphService.execute(

            LINK_INVOICE_TO_PURCHASE_ORDER,

            {

                invoiceNumber: entities.invoiceNumber,

                poNumber: entities.purchaseOrder

            }

        );

    }

}

export default new PurchaseOrderBuilder();