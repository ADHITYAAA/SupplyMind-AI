import mongoose from "mongoose";

const rackSchema = new mongoose.Schema(

    {

        /*
        =====================================
        Zone Reference
        =====================================
        */

        zone: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Zone",

            required: true

        },

        /*
        =====================================
        Rack Information
        =====================================
        */

        rackName: {

            type: String,

            required: true,

            trim: true

        },

        rackCode: {

            type: String,

            required: true,

            uppercase: true,

            trim: true

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
Unique Rack Per Zone
=====================================
*/

rackSchema.index(

    {

        zone: 1,

        rackCode: 1

    },

    {

        unique: true

    }

);

const Rack = mongoose.model(

    "Rack",

    rackSchema

);

export default Rack;