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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const User_1 = __importDefault(require("../models/User"));
const Unauthorized_1 = __importDefault(require("../utils/errors/Unauthorized"));
const authGuard = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.cookies['token_uid'] || req.body.token;
    console.log(token);
    if (!token)
        return next(new Unauthorized_1.default('Unauthorized user access'));
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    const user = yield User_1.default.findById(decodedToken.id);
    if (user === null) {
        return next(new Unauthorized_1.default('Unauthorized user access'));
    }
    req.user = user;
    next();
}));
exports.default = authGuard;
//# sourceMappingURL=authGuard.js.map