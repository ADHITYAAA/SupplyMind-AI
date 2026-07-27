import authRepository from "./auth.repository.js";
import jwtService from "./jwt.service.js";
import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class AuthService {

    /*
    =====================================
    Login User
    =====================================
    */

    async loginUser(loginData) {

        const { email, password } = loginData;

        // Find user by email
        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid email or password."
            );
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid email or password."
            );
        }

        // Check if account is active
        if (!user.isActive) {
            throw new ApiError(
                HTTP_STATUS.FORBIDDEN,
                "Your account has been deactivated."
            );
        }

        // Update last login
        await authRepository.updateLastLogin(user._id);

        // Fetch updated user (password excluded automatically)
        const updatedUser = await authRepository.findById(user._id);

        // Generate JWT Access Token
        const accessToken = jwtService.generateAccessToken(updatedUser);

        // Return authenticated user and token
        return {
            user: updatedUser,
            tokens: {
                accessToken
            }
        };

    }

    /*
    =====================================
    Get Current User
    =====================================
    */

    async getCurrentUser(userId) {

        const user = await authRepository.findById(userId);

        if (!user) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "User not found."
            );

        }

        return user;

    }

}

export default new AuthService();