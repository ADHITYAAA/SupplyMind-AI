import Tesseract from "tesseract.js";

import { PARSER_TYPES } from "../constants.js";

class ImageParser {

    /*
    =====================================
    Parse Image Using OCR
    =====================================
    */

    async parse(filePath) {

        try {

            const {

                data

            } = await Tesseract.recognize(

                filePath,

                "eng"

            );

            const extractedText =

                data.text

                    .replace(/\s+/g, " ")

                    .trim();

            return {

                success: true,

                parser:

                    PARSER_TYPES.IMAGE,

                fileType:

                    "image",

                extractedText,

                metadata: {

                    confidence:

                        data.confidence,

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

                    PARSER_TYPES.IMAGE,

                error:

                    error.message

            };

        }

    }

}

export default new ImageParser();