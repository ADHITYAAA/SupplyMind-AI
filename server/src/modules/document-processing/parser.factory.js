import { MIME_TYPES } from "./constants.js";

import PDFParser from "./parsers/pdf.parser.js";
import WordParser from "./parsers/word.parser.js";
import ExcelParser from "./parsers/excel.parser.js";
import CSVParser from "./parsers/csv.parser.js";
import TextParser from "./parsers/text.parser.js";
import ImageParser from "./parsers/image.parser.js";

class ParserFactory {

    /*
    =====================================
    Return Appropriate Parser
    =====================================
    */

    static getParser(mimeType, fileExtension = "") {

        const extension = (fileExtension || "").toLowerCase();

        console.log("\n========== PARSER FACTORY ==========");
        console.log("MIME TYPE :", mimeType);
        console.log("EXTENSION :", extension);
        console.log("====================================\n");

        /*
        =====================================
        Detect By File Extension First
        =====================================
        */

        switch (extension) {

            case ".pdf":

                return PDFParser;

            case ".doc":

            case ".docx":

                return WordParser;

            case ".xls":

            case ".xlsx":

                return ExcelParser;

            case ".csv":

                return CSVParser;

            case ".txt":

                return TextParser;

            case ".jpg":

            case ".jpeg":

            case ".png":

                return ImageParser;

        }

        /*
        =====================================
        Fallback Using MIME Type
        =====================================
        */

        switch (mimeType) {

            case MIME_TYPES.PDF:

                return PDFParser;

            case MIME_TYPES.DOC:

            case MIME_TYPES.DOCX:

                return WordParser;

            case MIME_TYPES.XLS:

            case MIME_TYPES.XLSX:

                return ExcelParser;

            case MIME_TYPES.CSV:

            case MIME_TYPES.CSV_ALT:

            case MIME_TYPES.CSV_EXCEL:

                return CSVParser;

            case MIME_TYPES.TXT:

                return TextParser;

            case MIME_TYPES.PNG:

            case MIME_TYPES.JPG:

            case MIME_TYPES.JPEG:

                return ImageParser;

            case MIME_TYPES.OCTET_STREAM:

                /*
                =====================================
                Unknown MIME

                Decide Using Extension
                =====================================
                */

                if (extension === ".csv") {

                    return CSVParser;

                }

                if (extension === ".txt") {

                    return TextParser;

                }

                if (extension === ".pdf") {

                    return PDFParser;

                }

                if (

                    extension === ".doc" ||

                    extension === ".docx"

                ) {

                    return WordParser;

                }

                if (

                    extension === ".xls" ||

                    extension === ".xlsx"

                ) {

                    return ExcelParser;

                }

                if (

                    extension === ".jpg" ||

                    extension === ".jpeg" ||

                    extension === ".png"

                ) {

                    return ImageParser;

                }

                break;

        }

        console.log("UNKNOWN MIME :", mimeType);
        console.log("UNKNOWN EXT  :", extension);

        throw new Error(

            `Unsupported file type. MIME=${mimeType}, EXT=${extension}`

        );

    }

}

export default ParserFactory;