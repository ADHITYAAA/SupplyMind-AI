import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(

    {

        /*
        =====================================
        Invoice Information
        =====================================
        */

        invoiceNumber: {

            type: String,

            required: true,

            unique: true,

            uppercase: true,

            trim: true

        },

        /*
        =====================================
        Purchase Order Reference
        =====================================
        */

        purchaseOrder: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "PurchaseOrder",

            required: true

        },

        /*
        =====================================
        Supplier Reference
        =====================================
        */

        supplier: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Supplier",

            required: true

        },

        /*
        =====================================
        Financial Information
        =====================================
        */

        subtotal: {

            type: Number,

            required: true,

            min: 0

        },

        taxAmount: {

            type: Number,

            default: 0,

            min: 0

        },

        discountAmount: {

            type: Number,

            default: 0,

            min: 0

        },

        totalAmount: {

            type: Number,

            required: true,

            min: 0

        },

        /*
        =====================================
        Invoice Dates
        =====================================
        */

        invoiceDate: {

            type: Date,

            required: true

        },

        dueDate: {

            type: Date,

            required: true

        },

        /*
        =====================================
        Payment Status
        =====================================
        */

        paymentStatus: {

            type: String,

            enum: [

                "Pending",

                "Partially Paid",

                "Paid",

                "Overdue"

            ],

            default: "Pending"

        },

        /*
        =====================================
        Remarks
        =====================================
        */

        remarks: {

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

const Invoice = mongoose.model(

    "Invoice",

    invoiceSchema

);

export default Invoice;