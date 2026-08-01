import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema(

    {

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
        Zone Information
        =====================================
        */

        zoneName: {

            type: String,

            required: true,

            trim: true

        },

        zoneCode: {

            type: String,

            required: true,

            uppercase: true,

            trim: true

        },

        zoneType: {

            type: String,

            enum: [

                "Receiving",

                "Storage",

                "Picking",

                "Packing",

                "Dispatch",

                "Returns",

                "Quality Inspection"

            ],

            required: true

        },

        description: {

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

/*
=====================================
Unique Zone Code Per Warehouse
=====================================
*/

zoneSchema.index(

    {

        warehouse: 1,

        zoneCode: 1

    },

    {

        unique: true

    }

);

const Zone = mongoose.model(

    "Zone",

    zoneSchema

);

export default Zone;