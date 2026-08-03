import graphService from "../graph.service.js";

import {

    CREATE_WAREHOUSE

} from "../queries/warehouse.query.js";

class WarehouseBuilder {

    async build(entities) {

        if (!entities.warehouse) {

            console.log("Warehouse Not Found");

            return;

        }

        console.log("\n====== WAREHOUSE BUILDER ======");

        console.log(

            "Warehouse :",

            entities.warehouse

        );

        const warehouseId =

            entities.warehouse

                .replace(/\s+/g, "_")

                .toUpperCase();

        /*
        =====================================
        Create Warehouse
        =====================================
        */

        await graphService.execute(

            CREATE_WAREHOUSE,

            {

                warehouseId,

                warehouseName:

                    entities.warehouse

            }

        );

        /*
        =====================================
        NOTE
        =====================================

        Warehouse -> Rack relationship
        is created inside Rack Builder
        after Rack node is created.

        */

    }

}

export default new WarehouseBuilder();