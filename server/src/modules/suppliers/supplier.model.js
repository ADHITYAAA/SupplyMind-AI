import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
    {
        supplierName: {
            type: String,
            required: true,
            trim: true
        },

        supplierCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        companyName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        website: {
            type: String,
            default: ""
        },

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

        gstNumber: {
            type: String,
            default: ""
        },

        taxNumber: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            default: "General"
        },

        paymentTerms: {
            type: String,
            default: "30 Days"
        },

        supplierRating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5
        },

        riskLevel: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Low"
        },

        status: {
            type: String,
            enum: ["Active", "Inactive", "Blocked"],
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

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;