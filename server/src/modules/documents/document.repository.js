import Document from "./document.model.js";
import buildPagination from "../../common/utils/pagination.js";

class DocumentRepository {

    /*
    =====================================
    Create Document
    =====================================
    */

    async create(documentData) {

        return await Document.create(documentData);

    }

    /*
    =====================================
    Find Document By ID
    =====================================
    */

    async findById(documentId) {

        return await Document.findById(documentId)

            .populate(

                "uploadedBy",

                "fullName email"

            );

    }

    /*
    =====================================
    Find By Stored File Name
    =====================================
    */

    async findByStoredFileName(storedFileName) {

        return await Document.findOne({

            storedFileName

        });

    }

    /*
    =====================================
    Get All Documents
    =====================================
    */

    async findAll(filters, page, limit) {

        const skip = (page - 1) * limit;

        const query = {};

        /*
        =====================================
        Document Type Filter
        =====================================
        */

        if (filters.documentType) {

            query.documentType = filters.documentType;

        }

        /*
        =====================================
        Upload Status Filter
        =====================================
        */

        if (filters.uploadStatus) {

            query.uploadStatus = filters.uploadStatus;

        }

        const documents = await Document.find(query)

            .populate(

                "uploadedBy",

                "fullName"

            )

            .sort({

                createdAt: -1

            })

            .skip(skip)

            .limit(limit);

        const total = await Document.countDocuments(

            query

        );

        return {

            documents,

            pagination: buildPagination(

                total,

                page,

                limit

            )

        };

    }

    /*
    =====================================
    Update Document
    =====================================
    */

    async update(

        documentId,

        documentData

    ) {

        return await Document.findByIdAndUpdate(

            documentId,

            documentData,

            {

                new: true,

                runValidators: true

            }

        )

            .populate(

                "uploadedBy",

                "fullName email"

            );

    }

    /*
    =====================================
    Delete Document
    =====================================
    */

    async delete(documentId) {

        return await Document.findByIdAndDelete(

            documentId

        );

    }

}

export default new DocumentRepository();