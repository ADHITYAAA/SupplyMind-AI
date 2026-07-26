import User from "./user.model.js";

class UserRepository {

    /*
    =========================================
    Create User
    =========================================
    */

    async create(userData) {
        return await User.create(userData);
    }

    /*
    =========================================
    Find User By ID
    =========================================
    */

    async findById(userId) {
        return await User.findById(userId);
    }

    /*
    =========================================
    Find User By Email
    =========================================
    */

    async findByEmail(email) {
        return await User.findOne({ email }).select("+password");
    }

    /*
    =========================================
    Find User By Employee ID
    =========================================
    */

    async findByEmployeeId(employeeId) {
        return await User.findOne({ employeeId });
    }

    /*
    =========================================
    Get All Users
    =========================================
    */

    async findAll() {
        return await User.find();
    }

    /*
    =========================================
    Update User
    =========================================
    */

    async update(userId, updateData) {
        return await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
    }

    /*
    =========================================
    Delete User
    =========================================
    */

    async delete(userId) {
        return await User.findByIdAndDelete(userId);
    }

    /*
    =========================================
    Update Last Login
    =========================================
    */

    async updateLastLogin(userId) {
        return await User.findByIdAndUpdate(
            userId,
            {
                lastLogin: new Date()
            },
            {
                new: true
            }
        );
    }

}

export default new UserRepository();