import ParserFactory from "./parser.factory.js";

class DocumentProcessingService {

    /*
    =====================================
    Process Uploaded Document
    =====================================
    */

    async processDocument(document) {

        try {

            /*
            =====================================
            Debug Information
            =====================================
            */

            console.log("\n====================================");
            console.log("DOCUMENT PROCESSING STARTED");
            console.log("File Name :", document.originalFileName);
            console.log("MIME Type :", document.mimeType);
            console.log("File Path :", document.storagePath);
            console.log("====================================\n");

            /*
            =====================================
            Select Appropriate Parser
            =====================================
            */

            const parser = ParserFactory.getParser(

                document.mimeType

            );

            console.log("Selected Parser :", parser.constructor.name);

            /*
            =====================================
            Parse Document
            =====================================
            */

            const result = await parser.parse(

                document.storagePath

            );

            console.log("\n====================================");
            console.log("DOCUMENT PROCESSING RESULT");
            console.log(result);
            console.log("====================================\n");

            return result;

        }

        catch (error) {

            console.log("\n====================================");
            console.log("DOCUMENT PROCESSING ERROR");
            console.error(error);
            console.log("====================================\n");

            return {

                success: false,

                parser: "UNKNOWN",

                error: error.message

            };

        }

    }

}

export default new DocumentProcessingService();