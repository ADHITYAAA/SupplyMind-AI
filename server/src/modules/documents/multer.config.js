import multer from "multer";
import fs from "fs";
import path from "path";

/*
=====================================
Upload Directory
=====================================
*/

const uploadDirectory = "uploads/documents";

/*
=====================================
Create Directory If Not Exists
=====================================
*/

if (!fs.existsSync(uploadDirectory)) {

    fs.mkdirSync(

        uploadDirectory,

        {

            recursive: true

        }

    );

}

/*
=====================================
Storage Configuration
=====================================
*/

const storage = multer.diskStorage({

    destination: (

        req,

        file,

        cb

    ) => {

        cb(

            null,

            uploadDirectory

        );

    },

    filename: (

        req,

        file,

        cb

    ) => {

        const timestamp = Date.now();

        const random = Math.round(

            Math.random() * 1e9

        );

        const extension = path.extname(

            file.originalname

        );

        cb(

            null,

            `${timestamp}-${random}${extension}`

        );

    }

});

/*
=====================================
Allowed File Types
=====================================
*/

const allowedMimeTypes = [

    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "application/vnd.ms-excel",

    "image/jpeg",

    "image/png"

];

/*
=====================================
File Filter
=====================================
*/

const fileFilter = (

    req,

    file,

    cb

) => {

    if (

        allowedMimeTypes.includes(

            file.mimetype

        )

    ) {

        cb(

            null,

            true

        );

    }

    else {

        cb(

            new Error(

                "Unsupported file type."

            ),

            false

        );

    }

};

/*
=====================================
Upload Middleware
=====================================
*/

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:

            20 * 1024 * 1024

    }

});

export default upload;