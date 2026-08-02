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
            console.log("====================================");

            console.log("Complete Document Object:");
            console.log(document);

            console.log("------------------------------------");
            console.log("Original File :", document.originalFileName);
            console.log("Stored File   :", document.storedFileName);
            console.log("MIME Type     :", JSON.stringify(document.mimeType));
            console.log("Extension     :", JSON.stringify(document.fileExtension));
            console.log("Storage Path  :", document.storagePath);
            console.log("------------------------------------");

            /*
            =====================================
            Select Appropriate Parser
            =====================================
            */

            const parser = ParserFactory.getParser(

                document.mimeType,

                document.fileExtension

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