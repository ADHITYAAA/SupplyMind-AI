import XLSX from "xlsx";

import { PARSER_TYPES } from "../constants.js";

class ExcelParser {

    /*
    =====================================
    Parse Excel Workbook
    =====================================
    */

    async parse(filePath) {

        try {

            const workbook = XLSX.readFile(

                filePath

            );

            let extractedText = "";

            /*
            =====================================
            Read Every Worksheet
            =====================================
            */

            workbook.SheetNames.forEach(

                (sheetName) => {

                    extractedText +=

                        `Sheet: ${sheetName}\n`;

                    const worksheet =

                        workbook.Sheets[

                            sheetName

                        ];

                    const rows =

                        XLSX.utils.sheet_to_json(

                            worksheet,

                            {

                                header: 1

                            }

                        );

                    rows.forEach(

                        (row) => {

                            extractedText +=

                                row.join(" | ")

                                + "\n";

                        }

                    );

                    extractedText += "\n";

                }

            );

            extractedText =

                extractedText

                    .replace(/\s+/g, " ")

                    .trim();

            return {

                success: true,

                parser:

                    PARSER_TYPES.EXCEL,

                fileType:

                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

                extractedText,

                metadata: {

                    sheetCount:

                        workbook.SheetNames.length,

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

                    PARSER_TYPES.EXCEL,

                error:

                    error.message

            };

        }

    }

}

export default new ExcelParser();