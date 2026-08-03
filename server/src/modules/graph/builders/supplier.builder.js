import graphService from "../graph.service.js";
import { CREATE_SUPPLIER } from "../queries/supplier.query.js";

class SupplierBuilder {

    async build(entities) {

        console.log("\n====== SUPPLIER BUILDER ======");

        console.log("Supplier:", entities.supplierName);

        if (!entities.supplierName) {

            console.log("No supplier found.");

            return;

        }

        const result = await graphService.execute(

            CREATE_SUPPLIER,

            {

                supplierName: entities.supplierName

            }

        );

        console.log("Neo4j Result:", result.summary.counters.updates());

        console.log("==============================\n");

    }

}

export default new SupplierBuilder();