"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorResponse_1 = __importDefault(require("./ErrorResponse"));
class BadRequest extends ErrorResponse_1.default {
    constructor(message) {
        super(400, message);
    }
}
exports.default = BadRequest;
//# sourceMappingURL=BadRequest.js.map