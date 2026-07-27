import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

const roleMiddleware = (...allowedRoles) => {

    return (req, res, next) => {

        /*
        =====================================
        Check Authentication
        =====================================
        */

        if (!req.user) {

            return next(
                new ApiError(
                    HTTP_STATUS.UNAUTHORIZED,
                    "Authentication required."
                )
            );

        }

        /*
        =====================================
        Check User Role
        =====================================
        */

        if (!allowedRoles.includes(req.user.role)) {

            return next(
                new ApiError(
                    HTTP_STATUS.FORBIDDEN,
                    "You do not have permission to access this resource."
                )
            );

        }

        next();

    };

};

export default roleMiddleware;