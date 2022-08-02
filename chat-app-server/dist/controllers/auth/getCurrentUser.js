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
const asyncHandler_1 = __importDefault(require("../../middlewares/asyncHandler"));
const User_1 = __importDefault(require("../../models/User"));
const getCurrentUser = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token_uid'];
    if (!token) {
        res.send({ success: true, data: { currentUser: null }, message: 'user is not registered' });
        return;
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    const user = yield User_1.default.findById(decodedToken.id);
    if (!user) {
        res.send({ success: true, data: { currentUser: null }, message: 'token is not valid.' });
        return;
    }
    res.json({ success: true, data: { currentUser: user }, message: 'valid token' });
}));
exports.default = getCurrentUser;
//# sourceMappingURL=getCurrentUser.js.map