class ShipmentExtractor {

    async extract(text) {

        return {

            documentType: "Shipment",

            rawText: text

        };

    }

}

export default new ShipmentExtractor();