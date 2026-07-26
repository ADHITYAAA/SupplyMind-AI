import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { USER_ROLES } from "../../common/constants/index.js";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        employeeId: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },

        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.EMPLOYEE
        },

        department: {
            type: String,
            default: "General"
        },

        phone: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },

        isActive: {
            type: Boolean,
            default: true
        },

        lastLogin: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

/*
=========================================
Hash Password Before Saving
=========================================
*/

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

});

/*
=========================================
Compare Password
=========================================
*/

userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

};

const User = mongoose.model("User", userSchema);

export default User;