import supplierBuilder from "./builders/supplier.builder.js";
import invoiceBuilder from "./builders/invoice.builder.js";
import purchaseOrderBuilder from "./builders/purchase-order.builder.js";
import productBuilder from "./builders/product.builder.js";
import warehouseBuilder from "./builders/warehouse.builder.js";
import rackBuilder from "./builders/rack.builder.js";
import shelfBuilder from "./builders/shelf.builder.js";

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

                console.log("Building Products...");
                await productBuilder.build(entities);

                console.log("Building Warehouse...");
                await warehouseBuilder.build(entities);

                console.log("Building Rack...");
                await rackBuilder.build(entities);

                console.log("Building Shelf...");
                await shelfBuilder.build(entities);

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