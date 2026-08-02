import fs from "fs";
import mammoth from "mammoth";

import { PARSER_TYPES } from "../constants.js";

class WordParser {

    /*
    =====================================
    Parse Word Document
    =====================================
    */

    async parse(filePath) {

        try {

            const buffer = fs.readFileSync(
                filePath
            );

            const result =
                await mammoth.extractRawText({

                    buffer

                });

            const extractedText =

                result.value

                    .replace(/\s+/g, " ")

                    .trim();

            return {

                success: true,

                parser:

                    PARSER_TYPES.WORD,

                fileType:

                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

                extractedText,

                metadata: {

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

                    PARSER_TYPES.WORD,

                error:

                    error.message

            };

        }

    }

}

export default new WordParser();