"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = void 0;
const mongoose_1 = require("mongoose");
var Gender;
(function (Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
    Gender["OTHER"] = "Other";
})(Gender = exports.Gender || (exports.Gender = {}));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'],
        maxlength: [30, 'name cannot be more than 30 characters'],
        minlength: [2, 'name cannot be less than two characters'],
        match: [/^[A-Za-z][A-Za-z0-9_]$/, "Invalid Name"],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'email is required'],
        unique: true,
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, "Invalid Email"],
    },
    gender: {
        type: String,
        enum: Gender,
        default: Gender.OTHER
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        match: [/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/, "Invalid Phone Number"],
    },
    photo: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    lastOnline: {
        type: Date,
    }
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map