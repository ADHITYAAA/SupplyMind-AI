import userRepository from "./user.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import { HTTP_STATUS } from "../../common/constants/index.js";

class UserService {

    /*
    =====================================
    Register User
    =====================================
    */

    async registerUser(userData) {

        // Check if email already exists
        const existingEmail = await userRepository.findByEmail(userData.email);

        if (existingEmail) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Email already exists."
            );
        }

        // Check if Employee ID already exists
        const existingEmployee = await userRepository.findByEmployeeId(
            userData.employeeId
        );

        if (existingEmployee) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Employee ID already exists."
            );
        }

        // Create User
        const createdUser = await userRepository.create(userData);

        // Fetch the created user again.
        // Since password has "select: false" in the model,
        // it will not be included in this response.
        const user = await userRepository.findById(createdUser._id);

        return user;
    }

    /*
    =====================================
    Find User By ID
    =====================================
    */

    async findUserById(userId) {

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "User not found."
            );
        }

        return user;
    }

    /*
    =====================================
    Find All Users
    =====================================
    */

    async findAllUsers() {

        return await userRepository.findAll();

    }

    /*
    =====================================
    Update User
    =====================================
    */

    async updateUser(userId, updateData) {

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "User not found."
            );
        }

        return await userRepository.update(userId, updateData);

    }

    /*
    =====================================
    Delete User
    =====================================
    */

    async deleteUser(userId) {

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "User not found."
            );
        }

        return await userRepository.delete(userId);

    }

}

export default new UserService();