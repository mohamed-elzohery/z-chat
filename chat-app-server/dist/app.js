"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//Routes
const AuthRouter_1 = __importDefault(require("./routes/v1/AuthRouter"));
const app = (0, express_1.default)();
process.env.NODE_ENV !== "production" && app.use((0, morgan_1.default)('dev'));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => res.end("dsfsdfd"));
app.use('/api/v1/auth', AuthRouter_1.default);
app.all('*', (req, res) => res.status(404).json({ message: "Undefinded Routes" }));
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map