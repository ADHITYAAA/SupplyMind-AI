import mongoose from "mongoose";

const shipmentItemSchema = new mongoose.Schema(

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
        }

    },

    {
        _id: false
    }

);

const shipmentSchema = new mongoose.Schema(

    {

        /*
        =====================================
        Shipment Information
        =====================================
        */

        shipmentNumber: {
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
        Transport Details
        =====================================
        */

        carrier: {
            type: String,
            default: ""
        },

        trackingNumber: {
            type: String,
            default: ""
        },

        vehicleNumber: {
            type: String,
            default: ""
        },

        driverName: {
            type: String,
            default: ""
        },

        driverPhone: {
            type: String,
            default: ""
        },

        /*
        =====================================
        Shipment Dates
        =====================================
        */

        shipmentDate: {
            type: Date,
            default: Date.now
        },

        estimatedDeliveryDate: {
            type: Date
        },

        actualDeliveryDate: {
            type: Date
        },

        /*
        =====================================
        Shipment Status
        =====================================
        */

        status: {
            type: String,
            enum: [

                "Pending",

                "In Transit",

                "Delivered",

                "Cancelled"

            ],
            default: "Pending"

        },

        /*
        =====================================
        Shipment Items
        =====================================
        */

        items: [

            shipmentItemSchema

        ],

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

const Shipment = mongoose.model(

    "Shipment",

    shipmentSchema

);

export default Shipment;