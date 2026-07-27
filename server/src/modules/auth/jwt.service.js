import jwt from "jsonwebtoken";

class JwtService {

    /*
    =====================================
    Generate Access Token
    =====================================
    */

    generateAccessToken(user) {

        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

    }

    /*
    =====================================
    Verify Access Token
    =====================================
    */

    verifyAccessToken(token) {

        return jwt.verify(
            token,
            process.env.JWT_SECRET
        );

    }

}

export default new JwtService();