import documentService from "./document.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/responses/ApiResponse.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class DocumentController {

    /*
    =====================================
    Upload Document
    =====================================
    */

    uploadDocument = asyncHandler(async (req, res) => {

        const document = await documentService.uploadDocument(

            req.file,

            req.body,

            req.user.id

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Document uploaded successfully.",

                document

            )

        );

    });

    /*
    =====================================
    Get Document By ID
    =====================================
    */

    getDocumentById = asyncHandler(async (req, res) => {

        const document = await documentService.findDocumentById(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Document fetched successfully.",

                document

            )

        );

    });

    /*
    =====================================
    Get All Documents
    =====================================
    */

    getAllDocuments = asyncHandler(async (req, res) => {

        const documents = await documentService.findAllDocuments(

            req.query

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Documents fetched successfully.",

                documents

            )

        );

    });

    /*
    =====================================
    Update Document
    =====================================
    */

    updateDocument = asyncHandler(async (req, res) => {

        const document = await documentService.updateDocument(

            req.params.id,

            req.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Document updated successfully.",

                document

            )

        );

    });

    /*
    =====================================
    Delete Document
    =====================================
    */

    deleteDocument = asyncHandler(async (req, res) => {

        await documentService.deleteDocument(

            req.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Document deleted successfully."

            )

        );

    });

}

export default new DocumentController();