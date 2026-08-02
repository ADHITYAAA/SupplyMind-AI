import path from "path";

import documentRepository from "./document.repository.js";

import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class DocumentService {

    /*
    =====================================
    Upload Document
    =====================================
    */

    async uploadDocument(file, body, userId) {

        if (!file) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Please upload a document."

            );

        }

        /*
        =====================================
        Build Document Record
        =====================================
        */

        const documentData = {

            originalFileName: file.originalname,

            storedFileName: file.filename,

            storagePath: file.path,

            mimeType: file.mimetype,

            fileExtension: path.extname(

                file.originalname

            ),

            fileSize: file.size,

            documentType:

                body.documentType || "Other",

            uploadedBy: userId

        };

        return await documentRepository.create(

            documentData

        );

    }

    /*
    =====================================
    Get Document By ID
    =====================================
    */

    async findDocumentById(documentId) {

        const document =

            await documentRepository.findById(

                documentId

            );

        if (!document) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Document not found."

            );

        }

        return document;

    }

    /*
    =====================================
    Get All Documents
    =====================================
    */

    async findAllDocuments(query) {

        const page = Number(

            query.page

        ) || 1;

        const limit = Number(

            query.limit

        ) || 10;

        const filters = {

            documentType:

                query.documentType,

            uploadStatus:

                query.uploadStatus

        };

        return await documentRepository.findAll(

            filters,

            page,

            limit

        );

    }

    /*
    =====================================
    Update Document
    =====================================
    */

    async updateDocument(

        documentId,

        documentData

    ) {

        const existingDocument =

            await documentRepository.findById(

                documentId

            );

        if (!existingDocument) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Document not found."

            );

        }

        return await documentRepository.update(

            documentId,

            documentData

        );

    }

    /*
    =====================================
    Delete Document
    =====================================
    */

    async deleteDocument(documentId) {

        const existingDocument =

            await documentRepository.findById(

                documentId

            );

        if (!existingDocument) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Document not found."

            );

        }

        return await documentRepository.delete(

            documentId

        );

    }

}

export default new DocumentService();