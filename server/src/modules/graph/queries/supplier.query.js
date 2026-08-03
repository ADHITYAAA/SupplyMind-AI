export const CREATE_SUPPLIER = `

MERGE (supplier:Supplier {

    name: $supplierName

})

RETURN supplier

`;