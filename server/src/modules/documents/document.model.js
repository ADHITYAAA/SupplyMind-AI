import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(

    {

        /*
        =====================================
        File Information
        =====================================
        */

        originalFileName: {

            type: String,

            required: true,

            trim: true

        },

        storedFileName: {

            type: String,

            required: true,

            unique: true

        },

        storagePath: {

            type: String,

            required: true

        },

        mimeType: {

            type: String,

            required: true

        },

        fileExtension: {

            type: String,

            required: true

        },

        fileSize: {

            type: Number,

            required: true,

            min: 0

        },

        /*
        =====================================
        Document Classification
        =====================================
        */

        documentType: {

            type: String,

            enum: [

                "Invoice",

                "Purchase Order",

                "Shipment",

                "Supplier Contract",

                "Inventory Report",

                "Forecast",

                "Other"

            ],

            default: "Other"

        },

        /*
        =====================================
        Processing Status
        =====================================
        */

        uploadStatus: {

            type: String,

            enum: [

                "Uploaded",

                "Processing",

                "Processed",

                "Failed"

            ],

            default: "Uploaded"

        },

        /*
        =====================================
        AI Processing Result
        =====================================
        */

        extractedText: {

            type: String,

            default: ""

        },

        /*
        =====================================
        Extracted Business Entities
        =====================================
        */

        extractedEntities: {

            type: mongoose.Schema.Types.Mixed,

            default: {}

        },

        /*
        =====================================
        Parser Information
        =====================================
        */

        parserUsed: {

            type: String,

            default: null

        },

        processingMetadata: {

            type: mongoose.Schema.Types.Mixed,

            default: {}

        },

        /*
        =====================================
        AI Processing Flags
        =====================================
        */

        isParsed: {

            type: Boolean,

            default: false

        },

        isEmbedded: {

            type: Boolean,

            default: false

        },

        isGraphProcessed: {

            type: Boolean,

            default: false

        },

        /*
        =====================================
        Audit
        =====================================
        */

        uploadedBy: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        }

    },

    {

        timestamps: true

    }

);

const Document = mongoose.model(

    "Document",

    documentSchema

);

export default Document;