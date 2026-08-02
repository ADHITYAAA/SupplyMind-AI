import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

import { PARSER_TYPES } from "../constants.js";

class PDFParser {

    /*
    =====================================
    Parse PDF
    =====================================
    */

    async parse(filePath) {

        try {

const buffer = fs.readFileSync(filePath);

const result = await pdf(buffer, {

    max: 0

});

            const extractedText =

                result.text

                    .replace(/\s+/g, " ")

                    .trim();

            return {

                success: true,

                parser:

                    PARSER_TYPES.PDF,

                fileType:

                    "application/pdf",

                extractedText,

                metadata: {

                    pageCount:

                        result.numpages,

                    wordCount:

                        extractedText

                            ? extractedText

                                .split(/\s+/)

                                .length

                            : 0,

                    characterCount:

                        extractedText.length,

                    extractedAt:

                        new Date()

                }

            };

        }

        catch (error) {

            return {

                success: false,

                parser:

                    PARSER_TYPES.PDF,

                error:

                    error.message

            };

        }

    }

}

export default new PDFParser();