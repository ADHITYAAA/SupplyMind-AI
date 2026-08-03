import supplierBuilder from "./builders/supplier.builder.js";
import invoiceBuilder from "./builders/invoice.builder.js";
import purchaseOrderBuilder from "./builders/purchase-order.builder.js";

class GraphBuilder {

    async build(documentType, entities) {

        console.log("\n==============================");
        console.log("GRAPH BUILDER");
        console.log("Document Type:", documentType);
        console.log("Entities:", entities);
        console.log("==============================\n");

        switch (documentType) {

            case "Invoice":

                console.log("Building Supplier...");
                await supplierBuilder.build(entities);

                console.log("Building Invoice...");
                await invoiceBuilder.build(entities);

                console.log("Building Purchase Order...");
                await purchaseOrderBuilder.build(entities);

                break;

            default:

                console.log("No Builder Found");

                break;

        }

        console.log("\n====================================");
        console.log("GRAPH BUILDER COMPLETED");
        console.log("====================================\n");

    }

}

export default new GraphBuilder();