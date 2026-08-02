import User from "../users/user.model.js";
import Supplier from "../suppliers/supplier.model.js";
import Product from "../products/product.model.js";
import Warehouse from "../warehouses/warehouse.model.js";
import Inventory from "../inventories/inventory.model.js";
import PurchaseOrder from "../purchase-orders/purchase-order.model.js";
import Shipment from "../shipments/shipment.model.js";
import Invoice from "../invoices/invoice.model.js";

import Zone from "../warehouse-zones/zone.model.js";
import Rack from "../warehouse-racks/rack.model.js";
import Shelf from "../warehouse-shelves/shelf.model.js";
import Bin from "../warehouse-bins/bin.model.js";

class DashboardRepository {

    /*
    =====================================
    Overview Dashboard
    =====================================
    */

    async getOverviewDashboard() {

        const [

            users,
            suppliers,
            products,
            warehouses,
            inventories,
            purchaseOrders,
            shipments,
            invoices

        ] = await Promise.all([

            User.countDocuments(),
            Supplier.countDocuments(),
            Product.countDocuments(),
            Warehouse.countDocuments(),
            Inventory.countDocuments(),
            PurchaseOrder.countDocuments(),
            Shipment.countDocuments(),
            Invoice.countDocuments()

        ]);

        return {

            users,
            suppliers,
            products,
            warehouses,
            inventories,
            purchaseOrders,
            shipments,
            invoices

        };

    }

    /*
    =====================================
    Inventory Dashboard
    =====================================
    */

    async getInventoryDashboard() {

        const [

            totalInventoryItems,
            totalStock,
            lowStockItems,
            outOfStockItems,
            inStockItems

        ] = await Promise.all([

            Inventory.countDocuments(),

            Inventory.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$currentStock"
                        }
                    }
                }
            ]),

            Inventory.countDocuments({
                stockStatus: "Low Stock"
            }),

            Inventory.countDocuments({
                stockStatus: "Out Of Stock"
            }),

            Inventory.countDocuments({
                stockStatus: "In Stock"
            })

        ]);

        return {

            totalInventoryItems,

            totalStock:

                totalStock.length > 0

                    ? totalStock[0].total

                    : 0,

            inStockItems,

            lowStockItems,

            outOfStockItems

        };

    }

    /*
    =====================================
    Procurement Dashboard
    =====================================
    */

    async getProcurementDashboard() {

        const [

            totalPurchaseOrders,
            pendingPurchaseOrders,
            approvedPurchaseOrders,
            totalShipments,
            pendingShipments,
            deliveredShipments,
            totalInvoices

        ] = await Promise.all([

            PurchaseOrder.countDocuments(),

            PurchaseOrder.countDocuments({
                status: "Pending"
            }),

            PurchaseOrder.countDocuments({
                status: "Approved"
            }),

            Shipment.countDocuments(),

            Shipment.countDocuments({
                shipmentStatus: "Pending"
            }),

            Shipment.countDocuments({
                shipmentStatus: "Delivered"
            }),

            Invoice.countDocuments()

        ]);

        return {

            totalPurchaseOrders,
            pendingPurchaseOrders,
            approvedPurchaseOrders,
            totalShipments,
            pendingShipments,
            deliveredShipments,
            totalInvoices

        };

    }

    /*
    =====================================
    Warehouse Dashboard
    =====================================
    */

    async getWarehouseDashboard() {

        const [

            warehouses,
            zones,
            racks,
            shelves,
            bins

        ] = await Promise.all([

            Warehouse.countDocuments(),
            Zone.countDocuments(),
            Rack.countDocuments(),
            Shelf.countDocuments(),
            Bin.countDocuments()

        ]);

        return {

            warehouses,
            zones,
            racks,
            shelves,
            bins

        };

    }

    /*
    =====================================
    Supplier Dashboard
    =====================================
    */

    async getSupplierDashboard() {

        const [

            totalSuppliers,
            activeSuppliers,
            inactiveSuppliers,
            recentSuppliers

        ] = await Promise.all([

            Supplier.countDocuments(),

            Supplier.countDocuments({
                status: "Active"
            }),

            Supplier.countDocuments({
                status: "Inactive"
            }),

            Supplier.find()

                .sort({
                    createdAt: -1
                })

                .limit(5)

                .select(
                    "supplierName supplierCode status"
                )

        ]);

        return {

            totalSuppliers,

            activeSuppliers,

            inactiveSuppliers,

            recentSuppliers

        };

    }

    /*
    =====================================
    Finance Dashboard
    =====================================
    */

    async getFinanceDashboard() {

        const [

            totalInvoices,

            pendingInvoices,

            paidInvoices,

            overdueInvoices,

            totalInvoiceAmount

        ] = await Promise.all([

            Invoice.countDocuments(),

            Invoice.countDocuments({
                paymentStatus: "Pending"
            }),

            Invoice.countDocuments({
                paymentStatus: "Paid"
            }),

            Invoice.countDocuments({
                paymentStatus: "Overdue"
            }),

            Invoice.aggregate([

                {

                    $group: {

                        _id: null,

                        total: {

                            $sum: "$totalAmount"

                        }

                    }

                }

            ])

        ]);

        return {

            totalInvoices,

            pendingInvoices,

            paidInvoices,

            overdueInvoices,

            totalInvoiceAmount:

                totalInvoiceAmount.length > 0

                    ? totalInvoiceAmount[0].total

                    : 0

        };

    }

}

export default new DashboardRepository();