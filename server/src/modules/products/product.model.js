import mongoose from "mongoose";

const productSchema = new mongoose.Schema(

    {

        productName: {
            type: String,
            required: true,
            trim: true
        },

        productCode: {
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
        Product Category
        =====================================
        */

        category: {
            type: String,
            required: true,
            trim: true
        },

        /*
        =====================================
        Brand
        =====================================
        */

        brand: {
            type: String,
            default: ""
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },

        costPrice: {
            type: Number,
            required: true,
            min: 0
        },

        sellingPrice: {
            type: Number,
            required: true,
            min: 0
        },

        unit: {
            type: String,
            enum: [
                "Piece",
                "Kg",
                "Litre",
                "Box",
                "Packet"
            ],
            default: "Piece"
        },

        minimumStock: {
            type: Number,
            default: 10
        },

        maximumStock: {
            type: Number,
            default: 100
        },

        barcode: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive"
            ],
            default: "Active"
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

const Product = mongoose.model(
    "Product",
    productSchema
);

export default Product;