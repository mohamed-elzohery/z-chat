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
const asyncHandler_1 = __importDefault(require("../../middlewares/asyncHandler"));
const BadRequest_1 = __importDefault(require("../../utils/errors/BadRequest"));
const User_1 = __importDefault(require("../../models/User"));
const login = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password: enteredPassword } = req.body;
    if (!(email && enteredPassword)) {
        return next(new BadRequest_1.default('Please enter email and password.'));
    }
    const user = yield User_1.default.findOne({ email });
    if (!(user !== null && (yield user.isPasswordMatched(enteredPassword)))) {
        return next(new BadRequest_1.default('Invalid email or password.'));
    }
    const token = user.createToken();
    res.cookie('token_uid', token, {
        httpOnly: true,
        expires: new Date(Date.now() + +process.env.JWT_AGE),
        path: '/'
    });
    res.json({ success: true, data: user, token, message: 'User is logged in successfully.' });
}));
exports.default = login;
//# sourceMappingURL=Login.js.map