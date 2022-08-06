"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        match: [/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/, "Invalid Name"],
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
    password: {
        type: String,
        required: [true, 'password is required.'],
        minlength: [8, "password cannot be less than 8 characters"],
        match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "password must be at least one letter, one number and one special character"]
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
    },
    status: {
        type: String,
        trim: true,
        maxlength: [60, "status cannot be longer than 60 characters"],
        default: "I am using Z chat",
    },
    friends: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User'
    }
});
// Hash password
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(this.password, salt);
        this.password = hash;
        next();
    });
});
UserSchema.methods.isPasswordMatched = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
UserSchema.methods.createToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id, email: this.email }, process.env.JWT_KEY, {
        expiresIn: +process.env.JWT_AGE / 1000,
    });
};
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map