import mongoose from "mongoose";

const shelfSchema = new mongoose.Schema(

    {

        /*
        =====================================
        Rack Reference
        =====================================
        */

        rack: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Rack",

            required: true

        },

        /*
        =====================================
        Shelf Information
        =====================================
        */

        shelfName: {

            type: String,

            required: true,

            trim: true

        },

        shelfCode: {

            type: String,

            required: true,

            uppercase: true,

            trim: true

        },

        level: {

            type: Number,

            required: true,

            min: 1

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
Unique Shelf Per Rack
=====================================
*/

shelfSchema.index(

    {

        rack: 1,

        shelfCode: 1

    },

    {

        unique: true

    }

);

const Shelf = mongoose.model(

    "Shelf",

    shelfSchema

);

export default Shelf;