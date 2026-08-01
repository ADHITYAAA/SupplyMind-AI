import mongoose from "mongoose";

const binSchema = new mongoose.Schema(

    {

        /*
        =====================================
        Shelf Reference
        =====================================
        */

        shelf: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Shelf",

            required: true

        },

        /*
        =====================================
        Bin Information
        =====================================
        */

        binName: {

            type: String,

            required: true,

            trim: true

        },

        binCode: {

            type: String,

            required: true,

            uppercase: true,

            trim: true

        },

        capacity: {

            type: Number,

            default: 0,

            min: 0

        },

        occupiedCapacity: {

            type: Number,

            default: 0,

            min: 0

        },

        status: {

            type: String,

            enum: [

                "Available",

                "Occupied",

                "Reserved",

                "Inactive"

            ],

            default: "Available"

        },

        description: {

            type: String,

            default: ""

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
Unique Bin Per Shelf
=====================================
*/

binSchema.index(

    {

        shelf: 1,

        binCode: 1

    },

    {

        unique: true

    }

);

const Bin = mongoose.model(

    "Bin",

    binSchema

);

export default Bin;