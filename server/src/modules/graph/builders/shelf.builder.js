import graphService from "../graph.service.js";

import {

    CREATE_SHELF,
    LINK_RACK_TO_SHELF,
    LINK_PRODUCT_TO_SHELF

} from "../queries/warehouse.query.js";

class ShelfBuilder {

    async build(entities) {

        if (!entities.shelf) {

            console.log("Shelf Not Found");

            return;

        }

        console.log("\n====== SHELF BUILDER ======");

        console.log(

            "Shelf :",

            entities.shelf

        );

        const shelfId =

            entities.shelf

                .replace(/\s+/g, "_")

                .toUpperCase();

        /*
        =====================================
        Create Shelf
        =====================================
        */

        await graphService.execute(

            CREATE_SHELF,

            {

                shelfId,

                shelfName:

                    entities.shelf

            }

        );

        /*
        =====================================
        Link Rack -> Shelf
        =====================================
        */

        if (

            entities.rack

        ) {

            const rackId =

                entities.rack

                    .replace(/\s+/g, "_")

                    .toUpperCase();

            await graphService.execute(

                LINK_RACK_TO_SHELF,

                {

                    rackId,

                    shelfId

                }

            );

        }

        /*
        =====================================
        Link Product -> Shelf
        =====================================
        */

        for (

            const product of entities.products

        ) {

            await graphService.execute(

                LINK_PRODUCT_TO_SHELF,

                {

                    productId:

                        product.productId,

                    shelfId

                }

            );

        }

    }

}

export default new ShelfBuilder();