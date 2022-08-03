import app from '../../../app';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../models/User';

let mongoServer: MongoMemoryServer;
const registerEndPoint = '/api/v1/auth/register';

describe('Register User', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        console.log(mongoUri);
        await mongoose.connect(mongoUri);
    });
      
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('Sending empty user data', async () => {
        await request(app)
              .post(registerEndPoint)
              .send({})
              .expect(400);
    });

    it('Sending invalid email', async () => {
        const response: request.Response = await request(app)
              .post(registerEndPoint)
              .send({
                name: "mohamed elzohery",
                email: "m.zohery1998gmail.com",
                phone: "01147905014",
                password: "Elzohery@52"
              });

        expect(response.body).toEqual({email: "Invalid Email"});
        expect(response.statusCode).toEqual(400);
    });

    it('Sending no password', async () => {
        const response: request.Response = await request(app)
              .post(registerEndPoint)
              .send({
                name: "mohamed elzohery",
                email: "m.zohery1998@gmail.com",
                phone: "01147905014",
              });

        expect(response.body).toEqual({password: "password is required."});
        expect(response.statusCode).toEqual(400);
    })

    describe('Sending taken email', () => {
        beforeEach(async () => {
            await request(app)
              .post(registerEndPoint)
              .send({
                name: "mohamed elzohery",
                email: "m.zohery1998@gmail.com",
                phone: "01147905014",
                password: 'Elzohery@333'
              });
        });

        it('POST / repeated email - 400 status code', async () => {
            const response: request.Response = await request(app)
              .post(registerEndPoint)
              .send({
                name: "mohamed elzohery",
                email: "m.zohery1998@gmail.com",
                phone: "01147905014",
                password: "Elzohery@52"
              });

        expect(response.body).toEqual({email: "email is duplicated"});
        expect(response.statusCode).toEqual(400);
        });

        afterEach(async () => {
            await User.deleteMany();
        });
    })

    it('Sending valid user data', async () => {
        const response: request.Response = await request(app)
              .post(registerEndPoint)
              .send({
                name: "mohamed elzohery",
                email: "m.zohery1998@gmail.com",
                phone: "01147905014",
                password: "Elzohery@52"
              })

              expect(response.statusCode).toEqual(201);
    });
});

