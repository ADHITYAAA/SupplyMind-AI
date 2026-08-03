/*
=====================================
Warehouse
=====================================
*/

export const CREATE_WAREHOUSE = `

MERGE (warehouse:Warehouse {

    warehouseId: $warehouseId

})

ON CREATE SET

    warehouse.name = $warehouseName

RETURN warehouse

`;



/*
=====================================
Rack
=====================================
*/

export const CREATE_RACK = `

MERGE (rack:Rack {

    rackId: $rackId

})

ON CREATE SET

    rack.name = $rackName

RETURN rack

`;



/*
=====================================
Shelf
=====================================
*/

export const CREATE_SHELF = `

MERGE (shelf:Shelf {

    shelfId: $shelfId

})

ON CREATE SET

    shelf.name = $shelfName

RETURN shelf

`;



/*
=====================================
Warehouse -> Rack
=====================================
*/

export const LINK_WAREHOUSE_TO_RACK = `

MATCH (warehouse:Warehouse {

    warehouseId: $warehouseId

})

MATCH (rack:Rack {

    rackId: $rackId

})

MERGE (warehouse)-[:HAS_RACK]->(rack)

RETURN warehouse, rack

`;



/*
=====================================
Rack -> Shelf
=====================================
*/

export const LINK_RACK_TO_SHELF = `

MATCH (rack:Rack {

    rackId: $rackId

})

MATCH (shelf:Shelf {

    shelfId: $shelfId

})

MERGE (rack)-[:HAS_SHELF]->(shelf)

RETURN rack, shelf

`;



/*
=====================================
Product -> Shelf
=====================================
*/

export const LINK_PRODUCT_TO_SHELF = `

MATCH (product:Product {

    productId: $productId

})

MATCH (shelf:Shelf {

    shelfId: $shelfId

})

MERGE (product)-[:STORED_IN]->(shelf)

RETURN product, shelf

`;