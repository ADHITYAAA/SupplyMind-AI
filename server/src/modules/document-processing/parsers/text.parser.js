import fs from "fs/promises";

import { PARSER_TYPES } from "../constants.js";

class TextParser {

    /*
    =====================================
    Parse Text File
    =====================================
    */

    async parse(filePath) {

        try {

            let extractedText =

                await fs.readFile(

                    filePath,

                    "utf8"

                );

            extractedText =

                extractedText

                    .replace(/\s+/g, " ")

                    .trim();

            return {

                success: true,

                parser:

                    PARSER_TYPES.TEXT,

                fileType:

                    "text/plain",

                extractedText,

                metadata: {

                    lineCount:

                        extractedText

                            ? extractedText

                                .split("\n")

                                .length

                            : 0,

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

                    PARSER_TYPES.TEXT,

                error:

                    error.message

            };

        }

    }

}

export default new TextParser();