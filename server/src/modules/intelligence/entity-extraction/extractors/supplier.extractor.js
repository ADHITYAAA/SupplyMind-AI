class SupplierExtractor {

    async extract(text) {

        return {

            documentType: "Supplier",

            rawText: text

        };

    }

}

export default new SupplierExtractor();