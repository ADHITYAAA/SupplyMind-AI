export const CREATE_PURCHASE_ORDER = `

MERGE (purchaseOrder:PurchaseOrder {

    poNumber: $poNumber

})

RETURN purchaseOrder

`;

export const LINK_INVOICE_TO_PURCHASE_ORDER = `

MATCH (invoice:Invoice {

    invoiceNumber: $invoiceNumber

})

MATCH (purchaseOrder:PurchaseOrder {

    poNumber: $poNumber

})

MERGE (invoice)-[:REFERS_TO]->(purchaseOrder)

RETURN invoice, purchaseOrder

`;