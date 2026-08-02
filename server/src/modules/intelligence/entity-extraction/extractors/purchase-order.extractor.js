class PurchaseOrderExtractor {

    async extract(text) {

        return {

            documentType: "Purchase Order",

            rawText: text

        };

    }

}

export default new PurchaseOrderExtractor();