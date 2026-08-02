import fs from "fs";
import csv from "csv-parser";

import { PARSER_TYPES } from "../constants.js";

class CSVParser {

    /*
    =====================================
    Parse CSV File
    =====================================
    */

    async parse(filePath) {

        return new Promise((resolve) => {

            try {

                const rows = [];

                fs.createReadStream(filePath)

                    .pipe(csv())

                    .on("data", (row) => {

                        rows.push(row);

                    })

                    .on("end", () => {

                        let extractedText = "";

                        rows.forEach((row) => {

                            extractedText +=

                                Object.values(row).join(" | ")

                                + "\n";

                        });

                        extractedText =

                            extractedText

                                .replace(/\s+/g, " ")

                                .trim();

                        resolve({

                            success: true,

                            parser:

                                PARSER_TYPES.CSV,

                            fileType:

                                "text/csv",

                            extractedText,

                            metadata: {

                                rowCount:

                                    rows.length,

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

                        });

                    })

                    .on("error", (error) => {

                        resolve({

                            success: false,

                            parser:

                                PARSER_TYPES.CSV,

                            error:

                                error.message

                        });

                    });

            }

            catch (error) {

                resolve({

                    success: false,

                    parser:

                        PARSER_TYPES.CSV,

                    error:

                        error.message

                });

            }

        });

    }

}

export default new CSVParser();