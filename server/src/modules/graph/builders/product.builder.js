import graphService from "../graph.service.js";

import {

    CREATE_PRODUCT,
    LINK_PURCHASE_ORDER_TO_PRODUCT

} from "../queries/product.query.js";

class ProductBuilder {

    async build(entities) {

        if (

            !entities.products ||

            entities.products.length === 0

        ) {

            console.log("No Products Found");

            return;

        }

        console.log("\n====== PRODUCT BUILDER ======");

        for (const product of entities.products) {

            console.log(

                "Creating Product:",

                product.productName

            );

            await graphService.execute(

                CREATE_PRODUCT,

                {

                    productId: product.productId,

                    productName: product.productName,

                    quantity: product.quantity,

                    unitPrice: product.unitPrice

                }

            );

            await graphService.execute(

                LINK_PURCHASE_ORDER_TO_PRODUCT,

                {

                    poNumber: entities.purchaseOrder,

                    productId: product.productId

                }

            );

        }

    }

}

export default new ProductBuilder();