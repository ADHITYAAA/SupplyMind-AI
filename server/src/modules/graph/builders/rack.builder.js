import graphService from "../graph.service.js";

import {

    CREATE_RACK,
    LINK_WAREHOUSE_TO_RACK

} from "../queries/warehouse.query.js";

class RackBuilder {

    async build(entities) {

        if (!entities.rack) {

            console.log("Rack Not Found");

            return;

        }

        console.log("\n====== RACK BUILDER ======");

        console.log(

            "Rack :",

            entities.rack

        );

        const rackId =

            entities.rack

                .replace(/\s+/g, "_")

                .toUpperCase();

        /*
        =====================================
        Create Rack
        =====================================
        */

        await graphService.execute(

            CREATE_RACK,

            {

                rackId,

                rackName:

                    entities.rack

            }

        );

        /*
        =====================================
        Link Warehouse -> Rack
        =====================================
        */

        if (

            entities.warehouse

        ) {

            const warehouseId =

                entities.warehouse

                    .replace(/\s+/g, "_")

                    .toUpperCase();

            await graphService.execute(

                LINK_WAREHOUSE_TO_RACK,

                {

                    warehouseId,

                    rackId

                }

            );

        }

        /*
        =====================================
        NOTE
        =====================================

        Rack -> Shelf relationship
        is created inside Shelf Builder
        after Shelf node is created.

        */

    }

}

export default new RackBuilder();