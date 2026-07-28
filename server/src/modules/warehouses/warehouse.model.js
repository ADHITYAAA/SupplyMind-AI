import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(

    {

        /*
        =====================================
        Basic Information
        =====================================
        */

        warehouseName: {
            type: String,
            required: true,
            trim: true
        },

        warehouseCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        /*
        =====================================
        Address
        =====================================
        */

        address: {

            street: {
                type: String,
                default: ""
            },

            city: {
                type: String,
                default: ""
            },

            state: {
                type: String,
                default: ""
            },

            country: {
                type: String,
                default: ""
            },

            postalCode: {
                type: String,
                default: ""
            }

        },

        /*
        =====================================
        Warehouse Capacity
        =====================================
        */

        capacity: {

            maximum: {
                type: Number,
                required: true,
                min: 0
            },

            current: {
                type: Number,
                default: 0,
                min: 0
            },

            unit: {
                type: String,
                enum: [
                    "Piece",
                    "Kg",
                    "Litre",
                    "Pallet",
                    "Ton"
                ],
                default: "Piece"
            }

        },

        /*
        =====================================
        Warehouse Manager
        =====================================
        */

        warehouseManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        /*
        =====================================
        Status
        =====================================
        */

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive"
            ],
            default: "Active"
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

const Warehouse = mongoose.model(
    "Warehouse",
    warehouseSchema
);

export default Warehouse;