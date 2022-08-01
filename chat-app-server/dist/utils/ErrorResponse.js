"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.default = ErrorResponse;
//# sourceMappingURL=ErrorResponse.js.map