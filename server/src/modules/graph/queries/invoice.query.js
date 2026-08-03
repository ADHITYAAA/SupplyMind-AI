export const CREATE_INVOICE = `

MERGE (invoice:Invoice {

    invoiceNumber: $invoiceNumber

})

ON CREATE SET

    invoice.invoiceDate = $invoiceDate,
    invoice.dueDate = $dueDate,
    invoice.totalAmount = $totalAmount

RETURN invoice

`;

export const LINK_SUPPLIER_TO_INVOICE = `

MATCH (supplier:Supplier {

    name: $supplierName

})

MATCH (invoice:Invoice {

    invoiceNumber: $invoiceNumber

})

MERGE (supplier)-[:ISSUED]->(invoice)

RETURN supplier, invoice

`;