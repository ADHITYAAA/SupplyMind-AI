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
Allowed MIME Types
=====================================
*/

const allowedMimeTypes = [

    /*
    PDF
    */

    "application/pdf",

    /*
    Word
    */

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    /*
    Excel
    */

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    /*
    CSV
    */

    "text/csv",

    "application/csv",

    /*
    Text
    */

    "text/plain",

    /*
    Images
    */

    "image/jpeg",

    "image/png"

];

/*
=====================================
Allowed Extensions
=====================================
*/

const allowedExtensions = [

    ".pdf",

    ".doc",

    ".docx",

    ".xls",

    ".xlsx",

    ".csv",

    ".txt",

    ".jpg",

    ".jpeg",

    ".png"

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

    const extension = path

        .extname(file.originalname)

        .toLowerCase();

    console.log("\n========== MULTER ==========");
    console.log("Original File :", file.originalname);
    console.log("MIME Type     :", file.mimetype);
    console.log("Extension     :", extension);
    console.log("============================\n");

    if (

        allowedMimeTypes.includes(file.mimetype)

        ||

        allowedExtensions.includes(extension)

    ) {

        cb(

            null,

            true

        );

    }

    else {

        cb(

            new Error(

                `Unsupported file type. MIME=${file.mimetype}, EXT=${extension}`

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