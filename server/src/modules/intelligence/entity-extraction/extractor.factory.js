import InvoiceExtractor from "./extractors/invoice.extractor.js";
import PurchaseOrderExtractor from "./extractors/purchase-order.extractor.js";
import ShipmentExtractor from "./extractors/shipment.extractor.js";
import SupplierExtractor from "./extractors/supplier.extractor.js";

class ExtractorFactory {

    getExtractor(documentType) {

        switch (documentType) {

            case "Invoice":

                return InvoiceExtractor;

            case "Purchase Order":

                return PurchaseOrderExtractor;

            case "Shipment":

                return ShipmentExtractor;

            case "Supplier":

                return SupplierExtractor;

            default:

                return InvoiceExtractor;

        }

    }

}

export default new ExtractorFactory();