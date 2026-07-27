import authRepository from "./auth.repository.js";
import jwtService from "./jwt.service.js";
import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

const authMiddleware = async (req, res, next) => {

    try {

        /*
        =====================================
        Get Authorization Header
        =====================================
        */

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Access token is required."
            );

        }

        /*
        =====================================
        Extract Token
        =====================================
        */

        const token = authHeader.split(" ")[1];

        /*
        =====================================
        Verify Token
        =====================================
        */

        const decoded = jwtService.verifyAccessToken(token);

        /*
        =====================================
        Find User
        =====================================
        */

        const user = await authRepository.findById(decoded.id);

        if (!user) {

            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "User not found."
            );

        }

        /*
        =====================================
        Check Active Status
        =====================================
        */

        if (!user.isActive) {

            throw new ApiError(
                HTTP_STATUS.FORBIDDEN,
                "Your account has been deactivated."
            );

        }

        /*
        =====================================
        Attach User To Request
        =====================================
        */

        req.user = user;

        next();

    } catch (error) {

        next(error);

    }

};

export default authMiddleware;