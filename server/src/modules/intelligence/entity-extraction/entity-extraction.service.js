import ExtractorFactory from "./extractor.factory.js";

class EntityExtractionService {

    /*
    =====================================
    Extract Business Entities
    =====================================
    */

    async extract(documentType, text) {

        const extractor =

            ExtractorFactory.getExtractor(

                documentType

            );

        return await extractor.extract(

            text

        );

    }

}

export default new EntityExtractionService();