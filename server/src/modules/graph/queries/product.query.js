export const CREATE_PRODUCT = `

MERGE (product:Product {

    productId: $productId

})

ON CREATE SET

    product.name = $productName,
    product.quantity = $quantity,
    product.unitPrice = $unitPrice

RETURN product

`;

export const LINK_PURCHASE_ORDER_TO_PRODUCT = `

MATCH (purchaseOrder:PurchaseOrder {

    poNumber: $poNumber

})

MATCH (product:Product {

    productId: $productId

})

MERGE (purchaseOrder)-[:CONTAINS]->(product)

RETURN purchaseOrder, product

`;