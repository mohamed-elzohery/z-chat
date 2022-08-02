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
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const User_1 = __importDefault(require("../../../models/User"));
let mongoServer;
const registerEndPoint = '/api/v1/auth/register';
describe('Register User', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        console.log(mongoUri);
        yield mongoose_1.default.connect(mongoUri);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    it('Sending empty user data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post(registerEndPoint)
            .send({})
            .expect(400);
    }));
    it('Sending invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(registerEndPoint)
            .send({
            name: "mohamed elzohery",
            email: "m.zohery1998gmail.com",
            phone: "01147905014",
            password: "Elzohery@52"
        });
        expect(response.body).toEqual("Invalid Email");
        expect(response.statusCode).toEqual(400);
    }));
    it('Sending no password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(registerEndPoint)
            .send({
            name: "mohamed elzohery",
            email: "m.zohery1998@gmail.com",
            phone: "01147905014",
        });
        expect(response.body).toEqual("password is required.");
        expect(response.statusCode).toEqual(400);
    }));
    describe('Sending taken email', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post(registerEndPoint)
                .send({
                name: "mohamed elzohery",
                email: "m.zohery1998@gmail.com",
                phone: "01147905014",
                password: 'Elzohery@333'
            });
        }));
        it('POST / repeated email - 400 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(registerEndPoint)
                .send({
                name: "mohamed elzohery",
                email: "m.zohery1998@gmail.com",
                phone: "01147905014",
                password: "Elzohery@52"
            });
            expect(response.body).toEqual("email is duplicated");
            expect(response.statusCode).toEqual(400);
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield User_1.default.deleteMany();
        }));
    });
    it('Sending valid user data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(registerEndPoint)
            .send({
            name: "mohamed elzohery",
            email: "m.zohery1998@gmail.com",
            phone: "01147905014",
            password: "Elzohery@52"
        });
        expect(response.statusCode).toEqual(201);
    }));
});
//# sourceMappingURL=register.test.js.map