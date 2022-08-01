"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const BadRequest_1 = __importDefault(require("../utils/BadRequest"));
const NotFound_1 = __importDefault(require("../utils/NotFound"));
const ErrorHandler = (err, req, res, next) => {
    // Check if error is explicitly thrown by the developer
    if (err instanceof ErrorResponse_1.default) {
        res.status(err.statusCode).json(err.message);
        return;
    }
    let error = {
        statusCode: 500,
        message: 'Server Error',
        name: 'server'
    };
    if (err.name && err.name === 'CastError') {
        error = new NotFound_1.default(`${err.params.id} is not found`);
    }
    if (err.name && err.name === 'ValidationError') {
        error = new BadRequest_1.default(err.errors[Object.keys(err.errors)[0]].properties.message);
    }
    if (err.code === 11000) {
        const fieldName = err.message.slice(err.message.indexOf("index:") + 7, err.message.indexOf("_1"));
        error = new BadRequest_1.default(`${fieldName} is duplicated`);
    }
    res.status(error.statusCode).json(error.message);
};
exports.default = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map