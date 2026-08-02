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

    static getParser(mimeType) {

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

                return CSVParser;

            case MIME_TYPES.TXT:

                return TextParser;

            case MIME_TYPES.PNG:

            case MIME_TYPES.JPG:

            case MIME_TYPES.JPEG:

                return ImageParser;

            default:

                throw new Error(

                    `Unsupported file type: ${mimeType}`

                );

        }

    }

}

export default ParserFactory;