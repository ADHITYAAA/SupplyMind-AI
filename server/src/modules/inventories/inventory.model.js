import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(

    {

        /*
        =====================================
        Product Reference
        =====================================
        */

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        /*
        =====================================
        Warehouse Reference
        =====================================
        */

        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },

        /*
        =====================================
        Exact Storage Location
        =====================================
        */

        bin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bin",
            default: null
        },

        /*
        =====================================
        Stock Information
        =====================================
        */

        currentStock: {
            type: Number,
            default: 0,
            min: 0
        },

        reservedStock: {
            type: Number,
            default: 0,
            min: 0
        },

        availableStock: {
            type: Number,
            default: 0,
            min: 0
        },

        /*
        =====================================
        Inventory Configuration
        =====================================
        */

        reorderLevel: {
            type: Number,
            default: 20,
            min: 0
        },

        safetyStock: {
            type: Number,
            default: 10,
            min: 0
        },

        maximumStock: {
            type: Number,
            default: 1000,
            min: 0
        },

        /*
        =====================================
        Stock Status
        =====================================
        */

        stockStatus: {
            type: String,
            enum: [
                "In Stock",
                "Low Stock",
                "Out Of Stock"
            ],
            default: "In Stock"
        },

        /*
        =====================================
        Audit
        =====================================
        */

        lastStockUpdate: {
            type: Date,
            default: Date.now
        },

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

/*
=====================================
One Product Per Warehouse Per Bin
=====================================
*/

inventorySchema.index(

    {

        product: 1,

        warehouse: 1,

        bin: 1

    },

    {

        unique: true

    }

);

const Inventory = mongoose.model(
    "Inventory",
    inventorySchema
);

export default Inventory;