import mongoose from "mongoose";

/*
=====================================
Purchase Order Item Schema
=====================================
*/

const purchaseOrderItemSchema = new mongoose.Schema(

    {

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        unitPrice: {
            type: Number,
            required: true,
            min: 0
        },

        lineTotal: {
            type: Number,
            required: true,
            min: 0
        }

    },

    {
        _id: false
    }

);

/*
=====================================
Purchase Order Schema
=====================================
*/

const purchaseOrderSchema = new mongoose.Schema(

    {

        /*
        =====================================
        Purchase Order Information
        =====================================
        */

        poNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },

        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },

        /*
        =====================================
        Dates
        =====================================
        */

        orderDate: {
            type: Date,
            default: Date.now
        },

        expectedDeliveryDate: {
            type: Date
        },

        /*
        =====================================
        Status
        =====================================
        */

        status: {
            type: String,
            enum: [

                "Draft",

                "Pending Approval",

                "Approved",

                "Ordered",

                "Partially Received",

                "Completed",

                "Cancelled"

            ],
            default: "Draft"
        },

        paymentStatus: {
            type: String,
            enum: [

                "Pending",

                "Partially Paid",

                "Paid"

            ],
            default: "Pending"
        },

        /*
        =====================================
        Purchase Order Items
        =====================================
        */

        items: [

            purchaseOrderItemSchema

        ],

        /*
        =====================================
        Financial Details
        =====================================
        */

        subtotal: {
            type: Number,
            default: 0
        },

        tax: {
            type: Number,
            default: 0
        },

        discount: {
            type: Number,
            default: 0
        },

        totalAmount: {
            type: Number,
            default: 0
        },

        /*
        =====================================
        Notes
        =====================================
        */

        notes: {
            type: String,
            default: ""
        },

        /*
        =====================================
        Audit
        =====================================
        */

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    },

    {

        timestamps: true

    }

);

const PurchaseOrder = mongoose.model(

    "PurchaseOrder",

    purchaseOrderSchema

);

export default PurchaseOrder;