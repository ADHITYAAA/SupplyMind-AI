import fs from "fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

import { PARSER_TYPES } from "../constants.js";

class PDFParser {

    /*
    =====================================
    Parse PDF
    =====================================
    */

    async parse(filePath) {

        try {

            /*
            =====================================
            Read PDF
            =====================================
            */

            const buffer = new Uint8Array(

                fs.readFileSync(filePath)

            );

            /*
            =====================================
            Load PDF
            =====================================
            */

            const loadingTask = getDocument({

                data: buffer

            });

            const pdf = await loadingTask.promise;

            /*
            =====================================
            Extract Text From All Pages
            =====================================
            */

            let extractedText = "";

            for (

                let pageNumber = 1;

                pageNumber <= pdf.numPages;

                pageNumber++

            ) {

                const page = await pdf.getPage(

                    pageNumber

                );

                const textContent =

                    await page.getTextContent();

                const pageText =

                    textContent.items

                        .map(item => item.str)

                        .join(" ");

                extractedText +=

                    pageText + " ";

            }

            extractedText =

                extractedText

                    .replace(/\s+/g, " ")

                    .trim();

            return {

                success: true,

                parser: PARSER_TYPES.PDF,

                fileType: "application/pdf",

                extractedText,

                metadata: {

                    pageCount:

                        pdf.numPages,

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

                parser: PARSER_TYPES.PDF,

                error: error.message

            };

        }

    }

}

export default new PDFParser();