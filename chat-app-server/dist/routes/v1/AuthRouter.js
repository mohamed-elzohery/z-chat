"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCurrentUser_1 = __importDefault(require("../../controllers/auth/getCurrentUser"));
const Login_1 = __importDefault(require("../../controllers/auth/Login"));
const Logout_1 = __importDefault(require("../../controllers/auth/Logout"));
const Register_1 = __importDefault(require("../../controllers/auth/Register"));
const AuthRouter = (0, express_1.Router)();
AuthRouter.get('/current-user', getCurrentUser_1.default);
AuthRouter.post('/logout', Logout_1.default);
AuthRouter.post('/login', Login_1.default);
AuthRouter.post('/register', Register_1.default);
exports.default = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map