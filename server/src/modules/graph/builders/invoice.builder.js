import graphService from "../graph.service.js";

import {

    CREATE_INVOICE,
    LINK_SUPPLIER_TO_INVOICE

} from "../queries/invoice.query.js";

class InvoiceBuilder {

    async build(entities) {

        if (!entities.invoiceNumber) {

            return;

        }

        await graphService.execute(

            CREATE_INVOICE,

            {

                invoiceNumber: entities.invoiceNumber,

                invoiceDate: entities.invoiceDate,

                dueDate: entities.dueDate,

                totalAmount: entities.totalAmount

            }

        );

        if (entities.supplierName) {

            await graphService.execute(

                LINK_SUPPLIER_TO_INVOICE,

                {

                    supplierName: entities.supplierName,

                    invoiceNumber: entities.invoiceNumber

                }

            );

        }

    }

}

export default new InvoiceBuilder();