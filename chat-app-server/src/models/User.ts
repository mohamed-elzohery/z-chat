import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export enum Gender{
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

export interface UserI {
    _id: string;
    name: string;
    email: string;
    gender: Gender;
    phone: string;
    password: string;
    photo?: string;
    isOnline: boolean;
    lastOnline: Date;
    status: string;
    friends: Schema.Types.ObjectId[];
    isPasswordMatched: (password: string) => Promise<boolean>;
    createToken: () => string; 
}  

const UserSchema = new Schema<UserI>({

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
        default: "blank-profile-picture-g4da4d42d6_640.png"
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
        maxlength: [100, "status cannot be longer than 100 characters"],
        default: "I am using Z chat",
    },

    friends: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }

});


// Hash password
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  });
  
UserSchema.methods.isPasswordMatched = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
UserSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_KEY, {
      expiresIn: +process.env.JWT_AGE / 1000,
    });
  };

const User = model<UserI>('User', UserSchema);

export default User;