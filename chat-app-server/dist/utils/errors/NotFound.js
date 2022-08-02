"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorResponse_1 = __importDefault(require("./ErrorResponse"));
class NotFound extends ErrorResponse_1.default {
    constructor(message) {
        super(404, message);
    }
}
exports.default = NotFound;
//# sourceMappingURL=NotFound.js.map