import User from "../users/user.model.js";

class AuthRepository {

    /*
    =====================================
    Find User By Email
    =====================================
    */

    async findByEmail(email) {

        return await User.findOne({ email }).select("+password");

    }

    /*
    =====================================
    Find User By ID
    =====================================
    */

    async findById(userId) {

        return await User.findById(userId);

    }

    /*
    =====================================
    Update Last Login
    =====================================
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

export default new AuthRepository();